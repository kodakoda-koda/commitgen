# commitgen

Generate git commit comments from source code differences.

Especially for personal hobby projects, you may have experienced that commit comments are often vague or meaningless. With commitgen, you can set up a git alias that generates natural commit comments from source code differences and commits them automatically.

# how to use

1. Clone this repository to any folder you like.
2. Create a .env file with your key. (or set env variables)

   - For OpenAI, specify the key in the .env file you created.

   ```:.env
   OPENAI_API_KEY={your OpenAI API Key}
   ```

   - For Azure OpenAI Service, specify the endpoint name, model name, and key.

   ```:.env
   AOAI_API_KEYAOAI_API_KEY={your Azure OpenAI API Key}
   AOAI_ENDPOINT={your Azure OpenAI API Endpoint}
   AOAI_MODEL={your Azure OpenAI Service's ChatGPT Model name}
   ```

   - For Google AI Studio, specify the key in the .env file you created.

   ```:.env
   GOOGLE_API_KEY={your Google AI Studio API Key}
   ```

3. Try running a test. Run the following command to check if it works.

```
node {absolute path of the clone folder}/commitgen.js "en" "Updated test.js".
```

First argument is language code, second argument is the text you want to generate commit comment.
Now, we are supporting only "en" and "ja" for language code.

4. Try to use on real project.
   After confirming that it works with an absolute path, move to your project that uses Git. After doing git add, run the following command.

```
git commit -m "$(node {absolute path of the clone folder}/commitgen.js "{language code}" "$(git diff --staged | cat)")"
```

5. Regist Github alias
   If you want to use github alias, please edit config and regist the below command.
   Open config

```
git config --global --edit
```

Add alias below.
**I confirmed the alias in GitBash on Windows, please modify this alias depending on your environment.**

```
[alias]
   ccg = !bash {absolute path of the clone folder}/scripts/ccg.sh {absolute path of the clone folder} {language code}
   ccgtest = !bash {absolute path of the clone folder}/scripts/ccgtest.sh {absolute path of the clone folder} {language code}
   acp = !bash {absolute path of the clone folder}/scripts/acp.sh {absolute path of the clone folder} {language code}
```

After edit the config, please use this tool like below.

```
git add .
git ccg
```

'git ccg' automatically commit your code with comment that AI create.
'git ccgtest' show the comment that the AI create.
'acp' is all-set of add-commit-push with the AI comment.
