---
title: Your dependencies are a liability
authors: [caesay]
tags: [security, supply-chain, ci, dependencies]
---

If you've been paying attention to the security space over the last couple of years, you've probably noticed a trend. Supply chain attacks are everywhere. They affect everyone: that tiny utility package buried deep in your dependency tree, giant companies with teams of engineers, solo maintainers, and everyone in between.

I've been thinking about this a lot recently, partly because we went through the exercise of hardening our own repos at Velopack, and partly because some of the attacks that surfaced recently are genuinely terrifying. I wanted to talk about what's been happening, why it matters, and what you can actually do about it.

<!-- truncate -->

## Some attacks that should keep you up at night

The one that set the tone was **XZ Utils** in early 2024. A threat actor spent *two and a half years* building trust as a contributor to a widely used Linux compression library. They submitted helpful patches, did code reviews, gradually became a co-maintainer. Then they slipped a backdoor into the build process, hidden inside obfuscated test fixture files. It scored a perfect 10.0 CVSS and would have given them remote code execution on basically any Linux server running OpenSSH. The only reason it got caught was because a Microsoft engineer noticed his SSH connections were using slightly more CPU than usual. Two years of social engineering, and the detection mechanism was one person noticing a performance blip. No automated tool, no CI check, no scanner caught it. Just luck.

The **Axios** compromise in early 2026 was a different kind of wake-up call. Axios gets around 70 million downloads a week on npm. A North Korean state actor compromised the lead maintainer's PC through social engineering, stole their npm credentials, and published trojanized versions that installed a RAT on anyone who updated. The malicious versions were live for about three hours, and because of how npm version ranges work (`^1.14.0`), CI pipelines across the ecosystem automatically pulled in the compromised version.

**Shai-Hulud** in late 2025 was the first self-replicating npm worm. It started with phishing emails that looked like they came from npm, asking developers to "update" their MFA settings. Once they had a developer's token, the worm would automatically find every other package that developer maintained, inject malicious postinstall scripts, and publish new versions. No human in the loop. It infected around 200 packages before it was contained, and CISA had to put out an advisory.

The **tj-actions** GitHub Actions compromise in March 2025 hit 23,000+ repositories by poisoning a widely-used action's version tags so they pointed to malicious code. The **Ultralytics** (YOLO) PyPI compromise happened through a GitHub Actions script injection vulnerability, and the malicious code only existed in the PyPI-distributed package, not in the source repo. The **Polyfill.io** takeover was someone buying the domain and CDN, then injecting malicious redirects into 100,000+ websites.

Every major package ecosystem has been hit. npm, PyPI, crates.io, NuGet, Go modules, none of them are immune.

## How these attacks actually work

If you look at the patterns, a few attack vectors come up repeatedly.

**Maintainer account compromise** is the most dangerous. Phishing for credentials, social engineering, malware on a developer's machine. The attacker publishes from a trusted account to a trusted package. No typo in the name, no unfamiliar publisher, it looks completely legitimate. The Axios attack is the textbook example.

**Typosquatting and dependency confusion** are the most common by volume. Publishing `requets` instead of `requests`, or registering a public package with the same name as a company's internal package. Sonatype has logged over a million malicious packages across registries, and the vast majority are this type. Each individual one has limited impact, but at scale it adds up.

**CI/CD pipeline attacks** are the force multiplier. If you can compromise a build pipeline, every artifact it produces is tainted, and CI systems are implicitly trusted. The Ultralytics attack stole PyPI upload tokens through a GitHub Actions vulnerability. The LiteLLM compromise in 2026 happened because their CI pipeline used a compromised security scanner, which exfiltrated their PyPI publishing tokens.

**Build script abuse** is easy to overlook. npm's `postinstall`, Cargo's `build.rs`, Python's `setup.py` all execute arbitrary code with full system privileges at install time, before any runtime sandboxing kicks in. Only about 2% of npm packages actually need postinstall scripts, but the mechanism is there for all of them.

**Developer tooling and IDE extensions** are a growing attack surface, and one that scales with team size. Every developer on your team who installs a VS Code extension is a potential entry point. In May 2026, the popular **Nx Console** extension (2.2 million installs, Verified Publisher badge) was compromised after a contributor's GitHub token was stolen through a separate supply chain attack on TanStack. The attacker pushed a malicious version that was live for just 18 minutes, but auto-updates pushed it to around 6,000 installs. One of those installs was on a GitHub employee's machine, and the stolen credentials were used to exfiltrate 3,800 internal GitHub repositories. Separately, two AI coding assistant extensions marketed as ChatGPT tools were found exfiltrating every source file developers opened back to servers in China, with a combined 1.5 million installs. The more developers you have, the more IDE extensions, browser tools, and local utilities are in play, and each one is a trust boundary you're probably not auditing.

The through-line here is that most of these attacks don't require finding a vulnerability in code. They exploit trust in maintainers, registries, CI systems, and the build process itself.

## What we did about it

We recently went through our repos at Velopack and tightened things up. Here's what that looked like in practice, and what I'd suggest if you haven't done this yet.

### Lock your dependencies

Commit your lockfiles (`Cargo.lock`, `package-lock.json`, etc.) and use them in CI. For Rust, that means adding `--locked` to every `cargo build`, `cargo test`, and `cargo clippy` command in your workflows. This ensures CI uses the exact versions you tested locally and fails if the lockfile is out of date. Without this, a compromised dependency could publish a new semver-compatible version and your CI would silently pick it up.

For GitHub Actions, **pin actions to full commit SHAs** instead of version tags. The tj-actions attack worked because tags are mutable. The attacker moved the tag to point at malicious code. A commit SHA can't be changed after the fact.

### Run dependency audits in CI

We added [cargo-deny](https://github.com/EmbarkStudios/cargo-deny) to our CI pipeline, which checks four things on every build:

- **Advisories**: does any dependency have a known vulnerability in the RustSec database?
- **Licenses**: is every dependency using an approved license? (we maintain an explicit allowlist)
- **Bans**: are there any wildcard version requirements that could pull in anything?
- **Sources**: is every dependency coming from an expected registry?

The npm equivalent would be something like `npm audit` or [Socket](https://socket.dev). The point is to automate this so it runs on every PR, not just when someone remembers to check.

### Delay non-security updates

We configured Renovate to wait 14 days before proposing updates for non-security patches. Most malicious package versions get caught and pulled within 24-72 hours. A two-week buffer means you're almost never the first to discover a compromised version.

Security vulnerabilities bypass this delay entirely. We set those to create PRs immediately with a `security` label so they don't get lost.

### Restrict CI permissions

By default, GitHub Actions tokens have write access to your repository. That's more than most workflows need. Set `permissions: contents: read` at the workflow level and only escalate where necessary. If a compromised action runs in your workflow, the blast radius is much smaller when the token can only read.

### Other things worth doing

**Use OIDC-based "trusted publishers"** for package registries if they support it (PyPI and npm both do now). Your CI publishes packages using short-lived tokens tied to your specific workflow, instead of long-lived API keys that can be stolen and used from anywhere.

**Disable postinstall scripts** where possible. `npm config set ignore-scripts true` or use pnpm, then explicitly whitelist the packages that actually need them. This eliminates one of the most common payload delivery mechanisms.

**Enforce MFA on all registry accounts**, preferably hardware keys. The Shai-Hulud phishing attack used a transparent proxy that forwarded credentials to the real npm site, TOTP codes included. Hardware security keys (FIDO2/WebAuthn) would have blocked it because they're bound to the actual domain.

**Evaluate new dependencies before adding them.** Check the [OpenSSF Scorecard](https://scorecard.dev), look at the maintainer's activity, consider whether you actually need the package or if you're pulling in a library for something you could write in 20 lines. Every dependency is a trust relationship. Fewer dependencies means fewer things that can go wrong.

**Audit your team's IDE extensions.** After the Nx Console and MaliciousCorgi incidents, this should be on every organization's radar. Consider maintaining an approved list of extensions, or at minimum disabling auto-updates for extensions so compromised versions don't silently roll out across your team.

## The uncomfortable truth

There's no silver bullet. The XZ Utils attack bypassed everything. It was a trusted maintainer with legitimate access making changes that passed review. No lockfile, no scanner, no audit tool would have caught it.

What we can do is raise the bar. The vast majority of supply chain attacks are far less sophisticated than XZ. They're someone publishing `ax1os` and hoping a developer fat-fingers their install command, or spraying phishing emails at maintainers. The defenses I've listed here handle most of those.

Most of this stuff takes an afternoon to set up. Adding `--locked` to your CI commands is a one-line change. Setting up cargo-deny or npm audit is maybe an hour of work. Configuring a release age delay on Renovate is a config file change. The cost is low and the protection is real.

If you maintain open source, or really any project with dependencies, take an afternoon and go through this list. Your future self will thank you when the next big supply chain incident drops and your build pipeline isn't blindly trusting everything the internet hands it.
