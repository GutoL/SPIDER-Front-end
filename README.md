# SPIDER GUI

SPIDER is a web interface developed using the Angular framework. It allows users to manage Service Function Chains (SFCs) and interacts with an API that works with Kubernetes to deploy the SFCs using containers.

## Features

- **SFC Management**: Easily create, edit, and delete Service Function Chains.
- **Container Deployment**: Interact with Kubernetes API to deploy SFCs using containers.

## Installation

1. Clone the repository:

    ```bash
    $ git clone git@github.com:GutoL/SPIDER-Front-end.git
    $ cd spider-front-end
    ```

2. Install dependencies:

    ```bash
    $ npm install
    ```

3. Configure API endpoint:

    Update the API endpoint in `src/app/services/system-config.service.ts`
    Update the variables `server_ip` and `server_port` to point to your Kubernetes API.

## Usage

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
Use the web interface to manage Service Function Chains and deploy them using Kubernetes.

## Contributing

Contributions are welcome! If you want to contribute to SPIDER, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

Please ensure that your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the Apache License 2.0 License. See the `LICENSE` file for more details.
