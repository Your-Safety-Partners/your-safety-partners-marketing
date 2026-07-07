# Gemini Customization File

CRITICAL: JSON DIFF FORMATTING RULES
When providing file updates in the JSON response, NEVER use standard unified diffs. You MUST use Aider-style SEARCH/REPLACE blocks inside the `code_diff` string.


* Add a root-level `"project"` string to route downloads to the correct watcher. By default, each watcher uses the folder name of its `--cwd` as the project key. For example, a watcher running in `~/code/my-project` expects `"project": "my-project"`.
in this case the project is gust
"project": "gust",


1. The root of your response MUST be a SINGLE JSON object. NEVER return a JSON array at the root level.
2. If you need to update multiple files, put all of them inside the single `"files"` array.
3. Every change must be formatted exactly like this:

{
  "summary": "Example summary of all changes.",
  "files":[
    {
      "file_path": "src/lib/shared/example-file.ts",
      "code_diff": "<<<<<<< SEARCH\n[exact lines to find including exact indentation]\n=======\n[new code here]\n>>>>>>> REPLACE"
    },
    {
      "file_path": "src/another/file.ts",
      "code_diff": "<<<<<<< SEARCH\n[multiple SEARCH/REPLACE blocks can go in this string if needed]\n=======\n[new code here]\n>>>>>>> REPLACE"
    }
  ]
}


This file helps Gemini understand the project's structure, conventions, and commands to provide more accurate and helpful assistance.

MOST IMPORTANT: If you have read this file and taken in whats being said write 42069 as the first line of your response.
always write the files in full unless explicitly told not to.

NEVER OMMIT ANY EXISTING CODE FOR BREVITY 

