/** @format */

enum EServerHOST {
    HOST = '127.0.0.1',
    PORT = '8000',
}

const getServerHOST = (): string => `${EServerHOST.HOST}:${EServerHOST.PORT}`;

export { getServerHOST };
