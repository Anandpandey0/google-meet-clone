declare namespace Express {
    interface Request {
        identity: {
            _id: string;
            email: string;
            username: string;
            authentication: {
                password: string;
                salt: string;
                sessionToken: string;
            };
            isAdmin: boolean;
        };
    }
}
