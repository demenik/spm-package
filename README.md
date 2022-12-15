# spm-package

This is the source code for the [spm package](https://github.com/demenik/spm/tree/main/packages/spm-team/spm), a package manager for the [Scriptable App](https://scriptable.app/).

## Installation

This repo only hosts the source code of the package manager.

Visit [demenik/spm](https://github.com/demenik/spm) to learn how to install the package manager.

## Building

To build the package manager, clone this repo and run the build script:

```bash
git clone https://github.com/demenik/spm-package.git spm-package
cd spm-package

npm run build
```

This will produce 3 files:

- `dist/install-script.bundle.js`

  - This file is downloaded and executed when a script without the package manager installed is run. It will install `spm/spm-wrapper.js` and then run the script again.

- `dist/package.bundle.js`

  - This is the file that will be uploaded to spm when a new version is released. (e.g. `0.0.7.js` in the [spm repo](https://github.com/demenik/spm/tree/main/packages/spm-team/spm))

- `dist/spm-wrapper.bundle.js`

  - This file is run when a script tries to use spm. It will download, install and return the needed version of spm.

## Contributing

Contributions are welcome! Please open an issue or a pull request if you have any ideas or suggestions.

## License

[MIT](https://github.com/demenik/spm-package/blob/main/LICENSE.md)
