import type { SidebarsConfig, PropSidebarItemHtml, PropSidebarItemLink } from '@docusaurus/plugin-content-docs';

function separator(): PropSidebarItemHtml {
  return {
    type: 'html',
    value: '<hr>',
    defaultStyle: true,
  }
}

function link(label: string, href: string): PropSidebarItemLink {
  return {
    type: 'link',
    label: label,
    href: href,
  }
}

function doc(docId: string, label?: string): any {
  return {
    type: 'doc',
    label: label,
    id: docId,
  }
}

function title(title: string): PropSidebarItemHtml {
  return {
    type: 'html',
    value: `<span class="sidebar-title-only">${title}</span>`,
    defaultStyle: true,
  }
}

const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],
  mainSidebar: [
    title("Getting Started"),
    "index",
    {
      type: 'category',
      label: 'Quick Start',
      items: [
        doc("getting-started/csharp", "C# .NET"),
        doc("getting-started/cpp", "C++"),
        doc("getting-started/electron", "JS / Electron"),
        doc("getting-started/rust", "Rust"),
      ]
    },
    {
      type: 'category',
      label: 'Sample Apps',
      items: [
        link("C# / AvaloniaUI", "https://github.com/velopack/velopack/tree/master/samples/AvaloniaCrossPlat"),
        link("C# / WPF", "https://github.com/velopack/velopack/tree/master/samples/VeloWpfSample"),
        link("C++ / Win32", "https://github.com/velopack/velopack.fusion/tree/master/for-cpp/samples/win32"),
        link("JS / Electron", "https://github.com/velopack/velopack.fusion/tree/master/for-cpp/samples/win32"),
        link("Rust / Iced", "https://github.com/velopack/velopack.fusion/tree/master/for-cpp/samples/win32"),
      ]
    },
    title("Essentials"),
    {
      type: 'category',
      label: 'Integrating',
      items: [{ type: "autogenerated", dirName: "updating" }]
    },
    {
      type: 'category',
      label: 'Packaging',
      items: [{ type: "autogenerated", dirName: "packaging" }]
    },
    {
      type: 'category',
      label: 'Distributing',
      items: [{ type: "autogenerated", dirName: "distributing" }]
    },
    title("Advanced"),
    {
      type: 'category',
      label: 'Troubleshooting',
      items: [{ type: "autogenerated", dirName: "troubleshooting" }]
    },
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
