# 71-simplify-path

You are given an **absolute path** for a Unix-style file system, which **always begins with a slash `/`**. Your task is to transform this absolute path into its **simplified canonical path**.

### Unix-Style File System Rules:

- A single period `.` represents the **current directory**.
- A double period `..` represents the **previous/parent directory**.
- Multiple consecutive slashes such as `//` or `///` are treated as a **single slash** `/`.
- Any sequence of periods that **does not exactly match** `.` or `..` should be treated as a **valid directory or file name**.  
  For example: `'...'` and `'....'` are valid directory or file names.

### Canonical Path Rules:

- Must start with a **single slash `/`**.
- Directories within the path must be separated by **exactly one slash `/`**.
- Must **not end** with a slash, unless it is the **root directory `/`**.
- Must **not include `.` or `..`** to denote current or parent directories.

### Examples:

#### Example 1:
**Input:**  
`path = "/home/"`

**Output:**  
`"/home"`

**Explanation:**  
The trailing slash should be removed.

#### Example 2:
**Input:**  
`path = "/home//foo/"`

**Output:**  
`"/home/foo"`

**Explanation:**  
Multiple consecutive slashes are replaced by a single one.

#### Example 3:
**Input:**  
`path = "/home/user/Documents/../Pictures"`

**Output:**  
`"/home/user/Pictures"`

**Explanation:**  
`..` refers to moving up one directory from `Documents` to `user`.

#### Example 4:
**Input:**  
`path = "/../"`

**Output:**  
`"/"`

**Explanation:**  
Going up one level from the root directory is not allowed.

#### Example 5:
**Input:**  
`path = "/.../a/../b/c/../d/./"`

**Output:**  
`"/.../b/d"`

**Explanation:**  
- `...` is treated as a valid directory name.
- `a/..` removes `a`
- `c/..` removes `c`
- `.` is ignored
- The final path is `/.../b/d`

### Constraints:

- `1 <= path.length <= 3000`
- `path` consists of English letters, digits, periods `.`, slashes `/`, or underscores `_`.
- `path` is a valid **absolute** Unix path.
