import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Attendance Portal API',
            version: '1.0.0',
            description: 'API documentation for the Attendance Portal',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                Attendance: {
                    type: 'object',
                    properties: {
                        date: {
                            type: 'string',
                            format: 'date',
                        },
                        churchDay: {
                            type: 'string',
                            enum: ['Sunday Service', 'Bible Study', 'Revival Hour', 'Workers Meeting', 'Koinonia', 'G.C.K', 'Other'],
                        },
                        categories: {
                            type: 'object',
                            properties: {
                                Children: {
                                    type: 'object',
                                    properties: {
                                        male: {
                                            type: 'number',
                                        },
                                        female: {
                                            type: 'number',
                                        },
                                    },
                                },
                                Youth: {
                                    type: 'object',
                                    properties: {
                                        male: {
                                            type: 'number',
                                        },
                                        female: {
                                            type: 'number',
                                        },
                                    },
                                },
                                Adult: {
                                    type: 'object',
                                    properties: {
                                        male: {
                                            type: 'number',
                                        },
                                        female: {
                                            type: 'number',
                                        },
                                    },
                                },
                                Visitor: {
                                    type: 'object',
                                    properties: {
                                        male: {
                                            type: 'number',
                                        },
                                        female: {
                                            type: 'number',
                                        },
                                    },
                                },
                            },
                        },
                        totalAttendance: {
                            type: 'number',
                        },
                        notes: {
                            type: 'string',
                            maxLength: 500,
                        },
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                        },
                        email: {
                            type: 'string',
                        },
                        password: {
                            type: 'string',
                        },
                        role: {
                            type: 'string',
                            enum: ['admin', 'user'],
                        },
                    },
                },
                Login: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                        },
                        password: {
                            type: 'string',
                        },
                    },
                },
                LoginResponse: {
                    type: 'object',
                    properties: {
                        token: {
                            type: 'string',
                        },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Paths to files containing OpenAPI definitions
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

export default setupSwagger;