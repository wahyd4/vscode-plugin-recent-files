## Notice

Due to the VSCode `Go to file` command already have this functionality, so I am not going to maintain this plugin any more. You can have what you have in Intellij just by modifying the keybindings.json in VSCode

 ![vscode][https://github.com/wahyd4/vscode-plugin-recent-files/raw/master/update.png]

### Mac
```json
{
  "key": "cmd+e",
  "command": "workbench.action.quickOpen"
}
```

### Windows
```json
{
  "key": "ctrl+e",
  "command": "workbench.action.quickOpen"
}
```
<hr>
## Features
  This plugin allows you to view the recently opened files. It's just like what you have in Intellij, not the VSCode offers.

  We encourage you to use `cmd` + `e` or `ctrl` + `e`keys in windows to trigger this feature. So you might want to update your `keybindings.json` to replace the VSCode's default Open Recent behavior.

  ```json
  { "key": "cmd+e",                 "command": "extension.openRecentFiles" },
  { "key": "ctrl+e",                 "command": "workbench.action.openRecent" }
  ```

## Notice
  * We don't list the files outside the workspace.

## How to use
  * press `cmd` + `e` (`ctrl` + `e` in Windows)
  * press `F1` then type `Open Recent Files`

## Screenshot
![Screenshot of open recent files](https://github.com/wahyd4/vscode-plugin-recent-files/raw/master/demo.gif)


-------------------------------------------------------------------------------------
