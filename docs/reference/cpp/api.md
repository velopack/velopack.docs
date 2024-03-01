# Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`namespace `[`Velopack`](#namespace_velopack) | 
`struct `[`subprocess_s`](#structsubprocess__s) | 

# namespace `Velopack` {#namespace_velopack}

## Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`enum `[`JsonNodeType`](#_velopack_8hpp_1a7dfd07faa4d65bbd8e7f1d0d0b5c5a04)            | 
`enum `[`JsonToken`](#_velopack_8hpp_1acaf7690482eab17e0269860d1860c9e2)            | 
`enum `[`VelopackAssetType`](#_velopack_8hpp_1aa83ef9d579b9fc2e42294528577ee904)            | 
`public void `[`startup`](#_velopack_8cpp_1a1a2c6842876e9c322e26c977f7bce384)`(char ** args,size_t c_args)`            | 
`class `[`Velopack::JsonNode`](#class_velopack_1_1_json_node) | 
`class `[`Velopack::JsonParser`](#class_velopack_1_1_json_parser) | 
`class `[`Velopack::Platform`](#class_velopack_1_1_platform) | 
`class `[`Velopack::StringStream`](#class_velopack_1_1_string_stream) | 
`class `[`Velopack::UpdateInfo`](#class_velopack_1_1_update_info) | Holds information about the current version and pending updates, such as how many there are, and access to release notes.
`class `[`Velopack::UpdateManagerSync`](#class_velopack_1_1_update_manager_sync) | This class is used to check for updates, download updates, and apply updates. It is a synchronous version of the UpdateManager class. This class is not recommended for use in GUI applications, as it will block the main thread, so you may want to use the async UpdateManager class instead, if it is supported for your programming language.
`class `[`Velopack::VelopackAsset`](#class_velopack_1_1_velopack_asset) | An individual Velopack asset, could refer to an asset on-disk or in a remote package feed.

## Members

#### `enum `[`JsonNodeType`](#_velopack_8hpp_1a7dfd07faa4d65bbd8e7f1d0d0b5c5a04) {#_velopack_8hpp_1a7dfd07faa4d65bbd8e7f1d0d0b5c5a04}

 Values                         | Descriptions                                
--------------------------------|---------------------------------------------
null            | 
bool_            | 
array            | 
object            | 
number            | 
string            | 

#### `enum `[`JsonToken`](#_velopack_8hpp_1acaf7690482eab17e0269860d1860c9e2) {#_velopack_8hpp_1acaf7690482eab17e0269860d1860c9e2}

 Values                         | Descriptions                                
--------------------------------|---------------------------------------------
none            | 
curlyOpen            | 
curlyClose            | 
squareOpen            | 
squareClose            | 
colon            | 
comma            | 
string            | 
number            | 
bool_            | 
null            | 

#### `enum `[`VelopackAssetType`](#_velopack_8hpp_1aa83ef9d579b9fc2e42294528577ee904) {#_velopack_8hpp_1aa83ef9d579b9fc2e42294528577ee904}

 Values                         | Descriptions                                
--------------------------------|---------------------------------------------
unknown            | 
full            | 
delta            | 

#### `public void `[`startup`](#_velopack_8cpp_1a1a2c6842876e9c322e26c977f7bce384)`(char ** args,size_t c_args)` {#_velopack_8cpp_1a1a2c6842876e9c322e26c977f7bce384}

# class `Velopack::JsonNode` {#class_velopack_1_1_json_node}

## Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`public  `[`JsonNode`](#class_velopack_1_1_json_node_1a1bf6d106ebbd1776709cf085fe333d76)`() = default` | 
`public JsonNodeType `[`getKind`](#class_velopack_1_1_json_node_1a923b2b13759e54b9072645a022c2f272)`() const` | Get the type of this node, such as string, object, array, etc. You should use this function and then call the corresponding AsObject, AsArray, AsString, etc. functions to get the actual parsed json information.
`public bool `[`isNull`](#class_velopack_1_1_json_node_1afb83035b3d626688d24493c86001d1d7)`() const` | Check if the JSON value is null.
`public bool `[`isEmpty`](#class_velopack_1_1_json_node_1ab56188938000f8fa88bc6a5a1c652ef5)`() const` | Check if the JSON value is empty - eg. an empty string, array, or object.
`public const std::unordered_map< std::string, std::shared_ptr< `[`JsonNode`](#class_velopack_1_1_json_node)` > > * `[`asObject`](#class_velopack_1_1_json_node_1a87d696801e278b663c10289276cb1ca2)`() const` | Reinterpret a JSON value as an object. Throws exception if the value type was not an object.
`public const std::vector< std::shared_ptr< `[`JsonNode`](#class_velopack_1_1_json_node)` > > * `[`asArray`](#class_velopack_1_1_json_node_1a76dbd4e67e4a58dafaeb80ebccd5b31b)`() const` | Reinterpret a JSON value as an array. Throws exception if the value type was not an array.
`public double `[`asNumber`](#class_velopack_1_1_json_node_1ae8b23482fd05ad4aaf67a842a55865f8)`() const` | Reinterpret a JSON value as a number. Throws exception if the value type was not a double.
`public bool `[`asBool`](#class_velopack_1_1_json_node_1a90b0d98c2b9ae42d7c83d00dbc64077b)`() const` | Reinterpret a JSON value as a boolean. Throws exception if the value type was not a boolean.
`public std::string_view `[`asString`](#class_velopack_1_1_json_node_1a7463c87e96a2dc5cf6cabf3ad7f0a577)`() const` | Reinterpret a JSON value as a string. Throws exception if the value type was not a string.
`public void `[`initBool`](#class_velopack_1_1_json_node_1a18a1848f9b1bd6ac76a884bbf3a2da92)`(bool value)` | 
`public void `[`initArray`](#class_velopack_1_1_json_node_1ac3d67c1ddb1b68382489368aa9c45314)`()` | 
`public void `[`addArrayChild`](#class_velopack_1_1_json_node_1abbacfa7b09b2f0df9c8c711025081eee)`(std::shared_ptr< `[`JsonNode`](#class_velopack_1_1_json_node)` > child)` | 
`public void `[`initObject`](#class_velopack_1_1_json_node_1a1092f357911d35eaeb2364ad0567f0af)`()` | 
`public void `[`addObjectChild`](#class_velopack_1_1_json_node_1a59c8ef42ce80b470f71e38bb6f6c0aaf)`(std::string_view key,std::shared_ptr< `[`JsonNode`](#class_velopack_1_1_json_node)` > child)` | 
`public void `[`initNumber`](#class_velopack_1_1_json_node_1aa0e4f7f297bc29dd23904de4b18910ed)`(double value)` | 
`public void `[`initString`](#class_velopack_1_1_json_node_1aa1f5ca52183d31e0c832d7530227b35d)`(std::string_view value)` | 

## Members

#### `public  `[`JsonNode`](#class_velopack_1_1_json_node_1a1bf6d106ebbd1776709cf085fe333d76)`() = default` {#class_velopack_1_1_json_node_1a1bf6d106ebbd1776709cf085fe333d76}

#### `public JsonNodeType `[`getKind`](#class_velopack_1_1_json_node_1a923b2b13759e54b9072645a022c2f272)`() const` {#class_velopack_1_1_json_node_1a923b2b13759e54b9072645a022c2f272}

Get the type of this node, such as string, object, array, etc. You should use this function and then call the corresponding AsObject, AsArray, AsString, etc. functions to get the actual parsed json information.

#### `public bool `[`isNull`](#class_velopack_1_1_json_node_1afb83035b3d626688d24493c86001d1d7)`() const` {#class_velopack_1_1_json_node_1afb83035b3d626688d24493c86001d1d7}

Check if the JSON value is null.

#### `public bool `[`isEmpty`](#class_velopack_1_1_json_node_1ab56188938000f8fa88bc6a5a1c652ef5)`() const` {#class_velopack_1_1_json_node_1ab56188938000f8fa88bc6a5a1c652ef5}

Check if the JSON value is empty - eg. an empty string, array, or object.

#### `public const std::unordered_map< std::string, std::shared_ptr< `[`JsonNode`](#class_velopack_1_1_json_node)` > > * `[`asObject`](#class_velopack_1_1_json_node_1a87d696801e278b663c10289276cb1ca2)`() const` {#class_velopack_1_1_json_node_1a87d696801e278b663c10289276cb1ca2}

Reinterpret a JSON value as an object. Throws exception if the value type was not an object.

#### `public const std::vector< std::shared_ptr< `[`JsonNode`](#class_velopack_1_1_json_node)` > > * `[`asArray`](#class_velopack_1_1_json_node_1a76dbd4e67e4a58dafaeb80ebccd5b31b)`() const` {#class_velopack_1_1_json_node_1a76dbd4e67e4a58dafaeb80ebccd5b31b}

Reinterpret a JSON value as an array. Throws exception if the value type was not an array.

#### `public double `[`asNumber`](#class_velopack_1_1_json_node_1ae8b23482fd05ad4aaf67a842a55865f8)`() const` {#class_velopack_1_1_json_node_1ae8b23482fd05ad4aaf67a842a55865f8}

Reinterpret a JSON value as a number. Throws exception if the value type was not a double.

#### `public bool `[`asBool`](#class_velopack_1_1_json_node_1a90b0d98c2b9ae42d7c83d00dbc64077b)`() const` {#class_velopack_1_1_json_node_1a90b0d98c2b9ae42d7c83d00dbc64077b}

Reinterpret a JSON value as a boolean. Throws exception if the value type was not a boolean.

#### `public std::string_view `[`asString`](#class_velopack_1_1_json_node_1a7463c87e96a2dc5cf6cabf3ad7f0a577)`() const` {#class_velopack_1_1_json_node_1a7463c87e96a2dc5cf6cabf3ad7f0a577}

Reinterpret a JSON value as a string. Throws exception if the value type was not a string.

#### `public void `[`initBool`](#class_velopack_1_1_json_node_1a18a1848f9b1bd6ac76a884bbf3a2da92)`(bool value)` {#class_velopack_1_1_json_node_1a18a1848f9b1bd6ac76a884bbf3a2da92}

#### `public void `[`initArray`](#class_velopack_1_1_json_node_1ac3d67c1ddb1b68382489368aa9c45314)`()` {#class_velopack_1_1_json_node_1ac3d67c1ddb1b68382489368aa9c45314}

#### `public void `[`addArrayChild`](#class_velopack_1_1_json_node_1abbacfa7b09b2f0df9c8c711025081eee)`(std::shared_ptr< `[`JsonNode`](#class_velopack_1_1_json_node)` > child)` {#class_velopack_1_1_json_node_1abbacfa7b09b2f0df9c8c711025081eee}

#### `public void `[`initObject`](#class_velopack_1_1_json_node_1a1092f357911d35eaeb2364ad0567f0af)`()` {#class_velopack_1_1_json_node_1a1092f357911d35eaeb2364ad0567f0af}

#### `public void `[`addObjectChild`](#class_velopack_1_1_json_node_1a59c8ef42ce80b470f71e38bb6f6c0aaf)`(std::string_view key,std::shared_ptr< `[`JsonNode`](#class_velopack_1_1_json_node)` > child)` {#class_velopack_1_1_json_node_1a59c8ef42ce80b470f71e38bb6f6c0aaf}

#### `public void `[`initNumber`](#class_velopack_1_1_json_node_1aa0e4f7f297bc29dd23904de4b18910ed)`(double value)` {#class_velopack_1_1_json_node_1aa0e4f7f297bc29dd23904de4b18910ed}

#### `public void `[`initString`](#class_velopack_1_1_json_node_1aa1f5ca52183d31e0c832d7530227b35d)`(std::string_view value)` {#class_velopack_1_1_json_node_1aa1f5ca52183d31e0c832d7530227b35d}

# class `Velopack::JsonParser` {#class_velopack_1_1_json_parser}

## Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`public  `[`JsonParser`](#class_velopack_1_1_json_parser_1a8ba6193b9910a65ea83b1805c4de2ae9)`() = default` | 
`public void `[`load`](#class_velopack_1_1_json_parser_1ad3616e263c683611394a9ffa069af1a3)`(std::string_view text)` | 
`public bool `[`endReached`](#class_velopack_1_1_json_parser_1a896ce20ecbe184cfe6474548e0b1628d)`() const` | 
`public std::string `[`readN`](#class_velopack_1_1_json_parser_1ad7c785bd0b73de6ee0bf14917e664955)`(int n)` | 
`public int `[`read`](#class_velopack_1_1_json_parser_1a4ca8b941e10641ba731f5e33f2015175)`()` | 
`public int `[`peek`](#class_velopack_1_1_json_parser_1ab3ea02be7bacf7eb9647d1cb71092861)`() const` | 
`public bool `[`peekWhitespace`](#class_velopack_1_1_json_parser_1a27372ad0097723fbc942c4a353ec88ab)`() const` | 
`public bool `[`peekWordbreak`](#class_velopack_1_1_json_parser_1a87791f81b34bcb3db86f5854a1e822b3)`() const` | 
`public void `[`eatWhitespace`](#class_velopack_1_1_json_parser_1a5fc6e6a6440ef530ff909b7e87d8d15c)`()` | 
`public std::string `[`readWord`](#class_velopack_1_1_json_parser_1a7ed0c81806d36f272d31a8ed5ccc30fa)`()` | 
`public std::shared_ptr< `[`JsonNode`](#class_velopack_1_1_json_node)` > `[`parseNull`](#class_velopack_1_1_json_parser_1a05611896186a61087f0bf12dc25b6d1a)`()` | 
`public std::shared_ptr< `[`JsonNode`](#class_velopack_1_1_json_node)` > `[`parseBool`](#class_velopack_1_1_json_parser_1a2bb75c78af5d495ed258940b2585e1a9)`()` | 
`public std::shared_ptr< `[`JsonNode`](#class_velopack_1_1_json_node)` > `[`parseNumber`](#class_velopack_1_1_json_parser_1a73e75b51dd5922e0440e176c406dce58)`()` | 
`public std::shared_ptr< `[`JsonNode`](#class_velopack_1_1_json_node)` > `[`parseString`](#class_velopack_1_1_json_parser_1a2eb42a0ea6db17db808548c3cb474fb5)`()` | 
`public std::shared_ptr< `[`JsonNode`](#class_velopack_1_1_json_node)` > `[`parseObject`](#class_velopack_1_1_json_parser_1ac91bfabf5959f71ff5f068c9af912910)`()` | 
`public std::shared_ptr< `[`JsonNode`](#class_velopack_1_1_json_node)` > `[`parseArray`](#class_velopack_1_1_json_parser_1a7659a483c15b4c3f94f8ceb7a951a4c9)`()` | 
`public std::shared_ptr< `[`JsonNode`](#class_velopack_1_1_json_node)` > `[`parseValue`](#class_velopack_1_1_json_parser_1a585c0e240fb52c3634c0df767fba8a74)`()` | 

## Members

#### `public  `[`JsonParser`](#class_velopack_1_1_json_parser_1a8ba6193b9910a65ea83b1805c4de2ae9)`() = default` {#class_velopack_1_1_json_parser_1a8ba6193b9910a65ea83b1805c4de2ae9}

#### `public void `[`load`](#class_velopack_1_1_json_parser_1ad3616e263c683611394a9ffa069af1a3)`(std::string_view text)` {#class_velopack_1_1_json_parser_1ad3616e263c683611394a9ffa069af1a3}

#### `public bool `[`endReached`](#class_velopack_1_1_json_parser_1a896ce20ecbe184cfe6474548e0b1628d)`() const` {#class_velopack_1_1_json_parser_1a896ce20ecbe184cfe6474548e0b1628d}

#### `public std::string `[`readN`](#class_velopack_1_1_json_parser_1ad7c785bd0b73de6ee0bf14917e664955)`(int n)` {#class_velopack_1_1_json_parser_1ad7c785bd0b73de6ee0bf14917e664955}

#### `public int `[`read`](#class_velopack_1_1_json_parser_1a4ca8b941e10641ba731f5e33f2015175)`()` {#class_velopack_1_1_json_parser_1a4ca8b941e10641ba731f5e33f2015175}

#### `public int `[`peek`](#class_velopack_1_1_json_parser_1ab3ea02be7bacf7eb9647d1cb71092861)`() const` {#class_velopack_1_1_json_parser_1ab3ea02be7bacf7eb9647d1cb71092861}

#### `public bool `[`peekWhitespace`](#class_velopack_1_1_json_parser_1a27372ad0097723fbc942c4a353ec88ab)`() const` {#class_velopack_1_1_json_parser_1a27372ad0097723fbc942c4a353ec88ab}

#### `public bool `[`peekWordbreak`](#class_velopack_1_1_json_parser_1a87791f81b34bcb3db86f5854a1e822b3)`() const` {#class_velopack_1_1_json_parser_1a87791f81b34bcb3db86f5854a1e822b3}

#### `public void `[`eatWhitespace`](#class_velopack_1_1_json_parser_1a5fc6e6a6440ef530ff909b7e87d8d15c)`()` {#class_velopack_1_1_json_parser_1a5fc6e6a6440ef530ff909b7e87d8d15c}

#### `public std::string `[`readWord`](#class_velopack_1_1_json_parser_1a7ed0c81806d36f272d31a8ed5ccc30fa)`()` {#class_velopack_1_1_json_parser_1a7ed0c81806d36f272d31a8ed5ccc30fa}

#### `public std::shared_ptr< `[`JsonNode`](#class_velopack_1_1_json_node)` > `[`parseNull`](#class_velopack_1_1_json_parser_1a05611896186a61087f0bf12dc25b6d1a)`()` {#class_velopack_1_1_json_parser_1a05611896186a61087f0bf12dc25b6d1a}

#### `public std::shared_ptr< `[`JsonNode`](#class_velopack_1_1_json_node)` > `[`parseBool`](#class_velopack_1_1_json_parser_1a2bb75c78af5d495ed258940b2585e1a9)`()` {#class_velopack_1_1_json_parser_1a2bb75c78af5d495ed258940b2585e1a9}

#### `public std::shared_ptr< `[`JsonNode`](#class_velopack_1_1_json_node)` > `[`parseNumber`](#class_velopack_1_1_json_parser_1a73e75b51dd5922e0440e176c406dce58)`()` {#class_velopack_1_1_json_parser_1a73e75b51dd5922e0440e176c406dce58}

#### `public std::shared_ptr< `[`JsonNode`](#class_velopack_1_1_json_node)` > `[`parseString`](#class_velopack_1_1_json_parser_1a2eb42a0ea6db17db808548c3cb474fb5)`()` {#class_velopack_1_1_json_parser_1a2eb42a0ea6db17db808548c3cb474fb5}

#### `public std::shared_ptr< `[`JsonNode`](#class_velopack_1_1_json_node)` > `[`parseObject`](#class_velopack_1_1_json_parser_1ac91bfabf5959f71ff5f068c9af912910)`()` {#class_velopack_1_1_json_parser_1ac91bfabf5959f71ff5f068c9af912910}

#### `public std::shared_ptr< `[`JsonNode`](#class_velopack_1_1_json_node)` > `[`parseArray`](#class_velopack_1_1_json_parser_1a7659a483c15b4c3f94f8ceb7a951a4c9)`()` {#class_velopack_1_1_json_parser_1a7659a483c15b4c3f94f8ceb7a951a4c9}

#### `public std::shared_ptr< `[`JsonNode`](#class_velopack_1_1_json_node)` > `[`parseValue`](#class_velopack_1_1_json_parser_1a585c0e240fb52c3634c0df767fba8a74)`()` {#class_velopack_1_1_json_parser_1a585c0e240fb52c3634c0df767fba8a74}

# class `Velopack::Platform` {#class_velopack_1_1_platform}

## Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------

## Members

# class `Velopack::StringStream` {#class_velopack_1_1_string_stream}

## Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`public  `[`StringStream`](#class_velopack_1_1_string_stream_1a7881ca72f76249dc905e83208adba0ba)`() = default` | 
`public void `[`clear`](#class_velopack_1_1_string_stream_1a25286df2ff42d828f4b7273bfcaa1ac1)`()` | 
`public void `[`write`](#class_velopack_1_1_string_stream_1a74de3a26bf75823586ac4e0ce9e57f12)`(std::string s)` | 
`public void `[`writeLine`](#class_velopack_1_1_string_stream_1afd73beeb474374ad0d9d5feca92d3dba)`(std::string s)` | 
`public void `[`writeChar`](#class_velopack_1_1_string_stream_1ad025e53ac91373dbe983128c7cb62519)`(int c)` | 
`public std::string `[`toString`](#class_velopack_1_1_string_stream_1ac9e5b82f2a193256d9e1ae94198d7f09)`() const` | 

## Members

#### `public  `[`StringStream`](#class_velopack_1_1_string_stream_1a7881ca72f76249dc905e83208adba0ba)`() = default` {#class_velopack_1_1_string_stream_1a7881ca72f76249dc905e83208adba0ba}

#### `public void `[`clear`](#class_velopack_1_1_string_stream_1a25286df2ff42d828f4b7273bfcaa1ac1)`()` {#class_velopack_1_1_string_stream_1a25286df2ff42d828f4b7273bfcaa1ac1}

#### `public void `[`write`](#class_velopack_1_1_string_stream_1a74de3a26bf75823586ac4e0ce9e57f12)`(std::string s)` {#class_velopack_1_1_string_stream_1a74de3a26bf75823586ac4e0ce9e57f12}

#### `public void `[`writeLine`](#class_velopack_1_1_string_stream_1afd73beeb474374ad0d9d5feca92d3dba)`(std::string s)` {#class_velopack_1_1_string_stream_1afd73beeb474374ad0d9d5feca92d3dba}

#### `public void `[`writeChar`](#class_velopack_1_1_string_stream_1ad025e53ac91373dbe983128c7cb62519)`(int c)` {#class_velopack_1_1_string_stream_1ad025e53ac91373dbe983128c7cb62519}

#### `public std::string `[`toString`](#class_velopack_1_1_string_stream_1ac9e5b82f2a193256d9e1ae94198d7f09)`() const` {#class_velopack_1_1_string_stream_1ac9e5b82f2a193256d9e1ae94198d7f09}

# class `Velopack::UpdateInfo` {#class_velopack_1_1_update_info}

Holds information about the current version and pending updates, such as how many there are, and access to release notes.

## Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`public std::shared_ptr< `[`VelopackAsset`](#class_velopack_1_1_velopack_asset)` > `[`targetFullRelease`](#class_velopack_1_1_update_info_1ae48ce8dce0fbb3e509e4767e42bead66) | The available version that we are updating to.
`public bool `[`isDowngrade`](#class_velopack_1_1_update_info_1a593247b70ac2ec4cc12870a7fa544f21) | True if the update is a version downgrade or lateral move (such as when switching channels to the same version number). In this case, only full updates are allowed, and any local packages on disk newer than the downloaded version will be deleted.
`public  `[`UpdateInfo`](#class_velopack_1_1_update_info_1ac124c42db882a61ca65f43a061fef338)`() = default` | 

## Members

#### `public std::shared_ptr< `[`VelopackAsset`](#class_velopack_1_1_velopack_asset)` > `[`targetFullRelease`](#class_velopack_1_1_update_info_1ae48ce8dce0fbb3e509e4767e42bead66) {#class_velopack_1_1_update_info_1ae48ce8dce0fbb3e509e4767e42bead66}

The available version that we are updating to.

#### `public bool `[`isDowngrade`](#class_velopack_1_1_update_info_1a593247b70ac2ec4cc12870a7fa544f21) {#class_velopack_1_1_update_info_1a593247b70ac2ec4cc12870a7fa544f21}

True if the update is a version downgrade or lateral move (such as when switching channels to the same version number). In this case, only full updates are allowed, and any local packages on disk newer than the downloaded version will be deleted.

#### `public  `[`UpdateInfo`](#class_velopack_1_1_update_info_1ac124c42db882a61ca65f43a061fef338)`() = default` {#class_velopack_1_1_update_info_1ac124c42db882a61ca65f43a061fef338}

# class `Velopack::UpdateManagerSync` {#class_velopack_1_1_update_manager_sync}

This class is used to check for updates, download updates, and apply updates. It is a synchronous version of the UpdateManager class. This class is not recommended for use in GUI applications, as it will block the main thread, so you may want to use the async UpdateManager class instead, if it is supported for your programming language.

## Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`public  `[`UpdateManagerSync`](#class_velopack_1_1_update_manager_sync_1a0725c325f7dfd276d8f4320b7e6524ff)`() = default` | 
`public void `[`setUrlOrPath`](#class_velopack_1_1_update_manager_sync_1ae56a277bbd4898786d73b61993640ecb)`(std::string urlOrPath)` | Set the URL or local file path to the update server. This is required before calling CheckForUpdates or DownloadUpdates.
`public void `[`setAllowDowngrade`](#class_velopack_1_1_update_manager_sync_1a85fc4369fadd9046d074feb2c86cfa4a)`(bool allowDowngrade)` | Allows UpdateManager to update to a version that's lower than the current version (i.e. downgrading). This could happen if a release has bugs and was retracted from the release feed, or if you're using ExplicitChannel to switch channels to another channel where the latest version on that channel is lower than the current version.
`public void `[`setExplicitChannel`](#class_velopack_1_1_update_manager_sync_1a0734f2d9c7aaf25c103fd5c5b469a212)`(std::string explicitChannel)` | This option should usually be left null. Overrides the default channel used to fetch updates. The default channel will be whatever channel was specified on the command line when building this release. For example, if the current release was packaged with 'channel beta', then the default channel will be 'beta'. This allows users to automatically receive updates from the same channel they installed from. This options allows you to explicitly switch channels, for example if the user wished to switch back to the 'stable' channel without having to reinstall the application.
`public bool `[`isInstalled`](#class_velopack_1_1_update_manager_sync_1a1c00744efbf661f9cbda40207fd8d670)`() const` | Returns true if the current app is installed, false otherwise. If the app is not installed, other functions in UpdateManager may throw exceptions, so you may want to check this before calling other functions.
`public std::string `[`getCurrentVersion`](#class_velopack_1_1_update_manager_sync_1a9b46af25127ae7267726cb8f48dc7c37)`() const` | Get the currently installed version of the application. If the application is not installed, this function will throw an exception.
`public std::shared_ptr< `[`UpdateInfo`](#class_velopack_1_1_update_info)` > `[`checkForUpdates`](#class_velopack_1_1_update_manager_sync_1a71e4aad5ba207741c10866e844341325)`() const` | This function will check for updates, and return information about the latest available release. This function runs synchronously and may take some time to complete, depending on the network speed and the number of updates available.
`public void `[`downloadUpdates`](#class_velopack_1_1_update_manager_sync_1abdbd2cf84cf64eed79f550e3277cdb6a)`(const `[`VelopackAsset`](#class_velopack_1_1_velopack_asset)` * toDownload) const` | Downloads the specified updates to the local app packages directory. If the update contains delta packages and ignoreDeltas=false, this method will attempt to unpack and prepare them. If there is no delta update available, or there is an error preparing delta packages, this method will fall back to downloading the full version of the update. This function will acquire a global update lock so may fail if there is already another update operation in progress.
`public void `[`applyUpdatesAndExit`](#class_velopack_1_1_update_manager_sync_1a5e1009cf9e2d7b852732e876f1c2188f)`(const `[`VelopackAsset`](#class_velopack_1_1_velopack_asset)` * toApply) const` | This will exit your app immediately, apply updates, and then optionally relaunch the app using the specified restart arguments. If you need to save state or clean up, you should do that before calling this method. The user may be prompted during the update, if the update requires additional frameworks to be installed etc.
`public void `[`applyUpdatesAndRestart`](#class_velopack_1_1_update_manager_sync_1a69a296e31573c3173c418758d333dc51)`(const `[`VelopackAsset`](#class_velopack_1_1_velopack_asset)` * toApply,const std::vector< std::string > * restartArgs) const` | This will exit your app immediately, apply updates, and then optionally relaunch the app using the specified restart arguments. If you need to save state or clean up, you should do that before calling this method. The user may be prompted during the update, if the update requires additional frameworks to be installed etc.
`public void `[`waitExitThenApplyUpdates`](#class_velopack_1_1_update_manager_sync_1aa6b15d1cf21d21aee749b38a224570c3)`(const `[`VelopackAsset`](#class_velopack_1_1_velopack_asset)` * toApply,bool silent,bool restart,const std::vector< std::string > * restartArgs) const` | This will launch the Velopack updater and tell it to wait for this program to exit gracefully. You should then clean up any state and exit your app. The updater will apply updates and then optionally restart your app. The updater will only wait for 60 seconds before giving up.
`protected std::vector< std::string > `[`getCurrentVersionCommand`](#class_velopack_1_1_update_manager_sync_1adb80fec8671f6ad9b4e3cf9fa5dbe458)`() const` | Returns the command line arguments to get the current version of the application.
`protected std::vector< std::string > `[`getCheckForUpdatesCommand`](#class_velopack_1_1_update_manager_sync_1a4d66d76a07cddda53ce3fd3a3306e6a9)`() const` | Returns the command line arguments to check for updates.
`protected std::vector< std::string > `[`getDownloadUpdatesCommand`](#class_velopack_1_1_update_manager_sync_1aa28503793c51523b98d5384ad3f6a28f)`(const `[`VelopackAsset`](#class_velopack_1_1_velopack_asset)` * toDownload) const` | Returns the command line arguments to download the specified update.
`protected std::vector< std::string > `[`getUpdateApplyCommand`](#class_velopack_1_1_update_manager_sync_1a47232672aab9d74f593a2bfe29f5eb3d)`(const `[`VelopackAsset`](#class_velopack_1_1_velopack_asset)` * toApply,bool silent,bool restart,bool wait,const std::vector< std::string > * restartArgs) const` | Returns the command line arguments to apply the specified update.
`protected std::string `[`getPackagesDir`](#class_velopack_1_1_update_manager_sync_1a8b0d484bcc50fc316ef662ecd5e09093)`() const` | Returns the path to the app's packages directory. This is where updates are downloaded to.

## Members

#### `public  `[`UpdateManagerSync`](#class_velopack_1_1_update_manager_sync_1a0725c325f7dfd276d8f4320b7e6524ff)`() = default` {#class_velopack_1_1_update_manager_sync_1a0725c325f7dfd276d8f4320b7e6524ff}

#### `public void `[`setUrlOrPath`](#class_velopack_1_1_update_manager_sync_1ae56a277bbd4898786d73b61993640ecb)`(std::string urlOrPath)` {#class_velopack_1_1_update_manager_sync_1ae56a277bbd4898786d73b61993640ecb}

Set the URL or local file path to the update server. This is required before calling CheckForUpdates or DownloadUpdates.

#### `public void `[`setAllowDowngrade`](#class_velopack_1_1_update_manager_sync_1a85fc4369fadd9046d074feb2c86cfa4a)`(bool allowDowngrade)` {#class_velopack_1_1_update_manager_sync_1a85fc4369fadd9046d074feb2c86cfa4a}

Allows UpdateManager to update to a version that's lower than the current version (i.e. downgrading). This could happen if a release has bugs and was retracted from the release feed, or if you're using ExplicitChannel to switch channels to another channel where the latest version on that channel is lower than the current version.

#### `public void `[`setExplicitChannel`](#class_velopack_1_1_update_manager_sync_1a0734f2d9c7aaf25c103fd5c5b469a212)`(std::string explicitChannel)` {#class_velopack_1_1_update_manager_sync_1a0734f2d9c7aaf25c103fd5c5b469a212}

This option should usually be left null. Overrides the default channel used to fetch updates. The default channel will be whatever channel was specified on the command line when building this release. For example, if the current release was packaged with 'channel beta', then the default channel will be 'beta'. This allows users to automatically receive updates from the same channel they installed from. This options allows you to explicitly switch channels, for example if the user wished to switch back to the 'stable' channel without having to reinstall the application.

#### `public bool `[`isInstalled`](#class_velopack_1_1_update_manager_sync_1a1c00744efbf661f9cbda40207fd8d670)`() const` {#class_velopack_1_1_update_manager_sync_1a1c00744efbf661f9cbda40207fd8d670}

Returns true if the current app is installed, false otherwise. If the app is not installed, other functions in UpdateManager may throw exceptions, so you may want to check this before calling other functions.

#### `public std::string `[`getCurrentVersion`](#class_velopack_1_1_update_manager_sync_1a9b46af25127ae7267726cb8f48dc7c37)`() const` {#class_velopack_1_1_update_manager_sync_1a9b46af25127ae7267726cb8f48dc7c37}

Get the currently installed version of the application. If the application is not installed, this function will throw an exception.

#### `public std::shared_ptr< `[`UpdateInfo`](#class_velopack_1_1_update_info)` > `[`checkForUpdates`](#class_velopack_1_1_update_manager_sync_1a71e4aad5ba207741c10866e844341325)`() const` {#class_velopack_1_1_update_manager_sync_1a71e4aad5ba207741c10866e844341325}

This function will check for updates, and return information about the latest available release. This function runs synchronously and may take some time to complete, depending on the network speed and the number of updates available.

#### `public void `[`downloadUpdates`](#class_velopack_1_1_update_manager_sync_1abdbd2cf84cf64eed79f550e3277cdb6a)`(const `[`VelopackAsset`](#class_velopack_1_1_velopack_asset)` * toDownload) const` {#class_velopack_1_1_update_manager_sync_1abdbd2cf84cf64eed79f550e3277cdb6a}

Downloads the specified updates to the local app packages directory. If the update contains delta packages and ignoreDeltas=false, this method will attempt to unpack and prepare them. If there is no delta update available, or there is an error preparing delta packages, this method will fall back to downloading the full version of the update. This function will acquire a global update lock so may fail if there is already another update operation in progress.

#### `public void `[`applyUpdatesAndExit`](#class_velopack_1_1_update_manager_sync_1a5e1009cf9e2d7b852732e876f1c2188f)`(const `[`VelopackAsset`](#class_velopack_1_1_velopack_asset)` * toApply) const` {#class_velopack_1_1_update_manager_sync_1a5e1009cf9e2d7b852732e876f1c2188f}

This will exit your app immediately, apply updates, and then optionally relaunch the app using the specified restart arguments. If you need to save state or clean up, you should do that before calling this method. The user may be prompted during the update, if the update requires additional frameworks to be installed etc.

#### `public void `[`applyUpdatesAndRestart`](#class_velopack_1_1_update_manager_sync_1a69a296e31573c3173c418758d333dc51)`(const `[`VelopackAsset`](#class_velopack_1_1_velopack_asset)` * toApply,const std::vector< std::string > * restartArgs) const` {#class_velopack_1_1_update_manager_sync_1a69a296e31573c3173c418758d333dc51}

This will exit your app immediately, apply updates, and then optionally relaunch the app using the specified restart arguments. If you need to save state or clean up, you should do that before calling this method. The user may be prompted during the update, if the update requires additional frameworks to be installed etc.

#### `public void `[`waitExitThenApplyUpdates`](#class_velopack_1_1_update_manager_sync_1aa6b15d1cf21d21aee749b38a224570c3)`(const `[`VelopackAsset`](#class_velopack_1_1_velopack_asset)` * toApply,bool silent,bool restart,const std::vector< std::string > * restartArgs) const` {#class_velopack_1_1_update_manager_sync_1aa6b15d1cf21d21aee749b38a224570c3}

This will launch the Velopack updater and tell it to wait for this program to exit gracefully. You should then clean up any state and exit your app. The updater will apply updates and then optionally restart your app. The updater will only wait for 60 seconds before giving up.

#### `protected std::vector< std::string > `[`getCurrentVersionCommand`](#class_velopack_1_1_update_manager_sync_1adb80fec8671f6ad9b4e3cf9fa5dbe458)`() const` {#class_velopack_1_1_update_manager_sync_1adb80fec8671f6ad9b4e3cf9fa5dbe458}

Returns the command line arguments to get the current version of the application.

#### `protected std::vector< std::string > `[`getCheckForUpdatesCommand`](#class_velopack_1_1_update_manager_sync_1a4d66d76a07cddda53ce3fd3a3306e6a9)`() const` {#class_velopack_1_1_update_manager_sync_1a4d66d76a07cddda53ce3fd3a3306e6a9}

Returns the command line arguments to check for updates.

#### `protected std::vector< std::string > `[`getDownloadUpdatesCommand`](#class_velopack_1_1_update_manager_sync_1aa28503793c51523b98d5384ad3f6a28f)`(const `[`VelopackAsset`](#class_velopack_1_1_velopack_asset)` * toDownload) const` {#class_velopack_1_1_update_manager_sync_1aa28503793c51523b98d5384ad3f6a28f}

Returns the command line arguments to download the specified update.

#### `protected std::vector< std::string > `[`getUpdateApplyCommand`](#class_velopack_1_1_update_manager_sync_1a47232672aab9d74f593a2bfe29f5eb3d)`(const `[`VelopackAsset`](#class_velopack_1_1_velopack_asset)` * toApply,bool silent,bool restart,bool wait,const std::vector< std::string > * restartArgs) const` {#class_velopack_1_1_update_manager_sync_1a47232672aab9d74f593a2bfe29f5eb3d}

Returns the command line arguments to apply the specified update.

#### `protected std::string `[`getPackagesDir`](#class_velopack_1_1_update_manager_sync_1a8b0d484bcc50fc316ef662ecd5e09093)`() const` {#class_velopack_1_1_update_manager_sync_1a8b0d484bcc50fc316ef662ecd5e09093}

Returns the path to the app's packages directory. This is where updates are downloaded to.

# class `Velopack::VelopackAsset` {#class_velopack_1_1_velopack_asset}

An individual Velopack asset, could refer to an asset on-disk or in a remote package feed.

## Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`public std::string `[`packageId`](#class_velopack_1_1_velopack_asset_1a644d04e0fcd56f7639db2d912a575d72) | The name or Id of the package containing this release.
`public std::string `[`version`](#class_velopack_1_1_velopack_asset_1a7afd3e784db4b8141e1abe936d91ed11) | The version of this release.
`public VelopackAssetType `[`type`](#class_velopack_1_1_velopack_asset_1a3bbb06f6e4d755e2a84e1df058e0aadd) | The type of asset (eg. full or delta).
`public std::string `[`fileName`](#class_velopack_1_1_velopack_asset_1ae1d567970986a7d24cfea97fe6834f1a) | The filename of the update package containing this release.
`public std::string `[`sha1`](#class_velopack_1_1_velopack_asset_1afe7b08c38ffad131e0d1edbc12847373) | The SHA1 checksum of the update package containing this release.
`public int64_t `[`size`](#class_velopack_1_1_velopack_asset_1a6ca5d1466adf5159e95f9656c62bc92a) | The size in bytes of the update package containing this release.
`public std::string `[`notesMarkdown`](#class_velopack_1_1_velopack_asset_1a3b904d81dda60c6953fedc54d058da9e) | The release notes in markdown format, as passed to Velopack when packaging the release.
`public std::string `[`notesHTML`](#class_velopack_1_1_velopack_asset_1aa8d00f3e2a6d7735a37663e7531791a1) | The release notes in HTML format, transformed from Markdown when packaging the release.
`public  `[`VelopackAsset`](#class_velopack_1_1_velopack_asset_1a8185777fc17f66b0258e949c3e421231)`() = default` | 

## Members

#### `public std::string `[`packageId`](#class_velopack_1_1_velopack_asset_1a644d04e0fcd56f7639db2d912a575d72) {#class_velopack_1_1_velopack_asset_1a644d04e0fcd56f7639db2d912a575d72}

The name or Id of the package containing this release.

#### `public std::string `[`version`](#class_velopack_1_1_velopack_asset_1a7afd3e784db4b8141e1abe936d91ed11) {#class_velopack_1_1_velopack_asset_1a7afd3e784db4b8141e1abe936d91ed11}

The version of this release.

#### `public VelopackAssetType `[`type`](#class_velopack_1_1_velopack_asset_1a3bbb06f6e4d755e2a84e1df058e0aadd) {#class_velopack_1_1_velopack_asset_1a3bbb06f6e4d755e2a84e1df058e0aadd}

The type of asset (eg. full or delta).

#### `public std::string `[`fileName`](#class_velopack_1_1_velopack_asset_1ae1d567970986a7d24cfea97fe6834f1a) {#class_velopack_1_1_velopack_asset_1ae1d567970986a7d24cfea97fe6834f1a}

The filename of the update package containing this release.

#### `public std::string `[`sha1`](#class_velopack_1_1_velopack_asset_1afe7b08c38ffad131e0d1edbc12847373) {#class_velopack_1_1_velopack_asset_1afe7b08c38ffad131e0d1edbc12847373}

The SHA1 checksum of the update package containing this release.

#### `public int64_t `[`size`](#class_velopack_1_1_velopack_asset_1a6ca5d1466adf5159e95f9656c62bc92a) {#class_velopack_1_1_velopack_asset_1a6ca5d1466adf5159e95f9656c62bc92a}

The size in bytes of the update package containing this release.

#### `public std::string `[`notesMarkdown`](#class_velopack_1_1_velopack_asset_1a3b904d81dda60c6953fedc54d058da9e) {#class_velopack_1_1_velopack_asset_1a3b904d81dda60c6953fedc54d058da9e}

The release notes in markdown format, as passed to Velopack when packaging the release.

#### `public std::string `[`notesHTML`](#class_velopack_1_1_velopack_asset_1aa8d00f3e2a6d7735a37663e7531791a1) {#class_velopack_1_1_velopack_asset_1aa8d00f3e2a6d7735a37663e7531791a1}

The release notes in HTML format, transformed from Markdown when packaging the release.

#### `public  `[`VelopackAsset`](#class_velopack_1_1_velopack_asset_1a8185777fc17f66b0258e949c3e421231)`() = default` {#class_velopack_1_1_velopack_asset_1a8185777fc17f66b0258e949c3e421231}

# struct `subprocess_s` {#structsubprocess__s}

## Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`public FILE * `[`stdin_file`](#structsubprocess__s_1ada32f1e1e07a418e4a4d7d57677e44f0) | 
`public FILE * `[`stdout_file`](#structsubprocess__s_1a49ea739e96d4555a1de30358de62034c) | 
`public FILE * `[`stderr_file`](#structsubprocess__s_1ac44a1727285472c541281bada32db7ea) | 
`public pid_t `[`child`](#structsubprocess__s_1a30b0a7616f06a6374de9c52268e6c9e3) | 
`public int `[`return_status`](#structsubprocess__s_1a4a6027dbf0c75e5adee516ddf0c99860) | 
`public subprocess_size_t `[`alive`](#structsubprocess__s_1ae931c423d39d981ab8b10cbdd49ae5ad) | 

## Members

#### `public FILE * `[`stdin_file`](#structsubprocess__s_1ada32f1e1e07a418e4a4d7d57677e44f0) {#structsubprocess__s_1ada32f1e1e07a418e4a4d7d57677e44f0}

#### `public FILE * `[`stdout_file`](#structsubprocess__s_1a49ea739e96d4555a1de30358de62034c) {#structsubprocess__s_1a49ea739e96d4555a1de30358de62034c}

#### `public FILE * `[`stderr_file`](#structsubprocess__s_1ac44a1727285472c541281bada32db7ea) {#structsubprocess__s_1ac44a1727285472c541281bada32db7ea}

#### `public pid_t `[`child`](#structsubprocess__s_1a30b0a7616f06a6374de9c52268e6c9e3) {#structsubprocess__s_1a30b0a7616f06a6374de9c52268e6c9e3}

#### `public int `[`return_status`](#structsubprocess__s_1a4a6027dbf0c75e5adee516ddf0c99860) {#structsubprocess__s_1a4a6027dbf0c75e5adee516ddf0c99860}

#### `public subprocess_size_t `[`alive`](#structsubprocess__s_1ae931c423d39d981ab8b10cbdd49ae5ad) {#structsubprocess__s_1ae931c423d39d981ab8b10cbdd49ae5ad}

Generated by [Moxygen](https://sourcey.com/moxygen)