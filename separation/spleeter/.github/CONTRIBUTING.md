# How-to contribute

Those are the main contributing guidelines for contributing to this project:

- Verify that your contribution does not embark proprietary code or infringe any copyright of any sort.
- Avoid adding any unnecessary dependencies to the project, espcially of those are not easily packaged and installed through `conda` or `pip`.
- Python contributions must follow the [PEP 8 style guide](https://www.python.org/dev/peps/pep-0008/).
- Use [Pull Request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests) mechanism and please be patient while waiting for reviews.
- Remain polite and civil in all exchanges with the maintainers and other contributors.
- Any issue submitted which does not respect provided template, or lack of information, will be considered as invalid and automatically closed.

## Get started

This project is managed using [Poetry](https://python-poetry.org/docs/basic-usage/),
in order to contribute, the safest is to create your
[own fork of spleeter](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) first and then setup your development environment:

```bash
# Clone spleeter repository fork
git clone https://github.com/<your_name>/spleeter && cd spleeter
# Install poetry
pip install poetry
# Install spleeter dependencies
poetry install
# Run unit test suite
poetry run pytest tests/
```

You can then make your changes and experiment freely. Once you're done, remember to check that the tests still run. If you've added a new feature, add tests!

Then finally, you're more than welcome to create a [Pull Request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork) in **Spleeter** main repo. We will look at it as soon as possible and eventually integrate your changes in the project.

## PR requirements

Following command should be ran successfully before to consider a PR for merging:

```bash
poetry run pytest tests/
poetry run black spleeter
poetry run isort spleeter
```
