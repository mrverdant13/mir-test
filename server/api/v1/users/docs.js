exports.usersPaths = {
  '/users/signup': {
    post: {
      tags: ['users'],
      summary: 'Sign up',
      description: 'Sign up',
      operationId: 'signup',
      requestBody: {
        description: 'Sign up data',
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/SignupBody',
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Successful sign up',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
  '/users/login': {
    post: {
      tags: ['users'],
      summary: 'Sign in',
      description: 'Sign in',
      operationId: 'login',
      requestBody: {
        description: 'Login data',
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/LoginBody',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Successful login',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
        401: {
          description: 'Invalid credentials',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
  '/users/me': {
    get: {
      tags: ['users'],
      summary: 'Get user profile',
      description: 'Get user profile',
      operationId: 'me',
      security: [{ Bearer: [] }],
      responses: {
        200: {
          description: 'Successful profile retrieval',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
        401: {
          description: 'Unauthorized',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
};

exports.userSchemas = {
  SignupBody: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
      },
      password: {
        type: 'string',
        format: 'password',
      },
    },
    required: ['email', 'password'],
  },
  LoginBody: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
      },
      password: {
        type: 'string',
        format: 'password',
      },
    },
    required: ['email', 'password'],
  },
  User: {
    type: 'object',
    properties: {
      _id: {
        type: 'string',
      },
      email: {
        type: 'string',
        format: 'email',
      },
      // password: {
      //   type: 'string',
      // },
      createdAt: {
        type: 'string',
        format: 'date-time',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
      },
    },
  },
};
