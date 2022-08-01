"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
require("dotenv/config");
const method_override_1 = __importDefault(require("method-override"));
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)('week-9-node-task-sq011-poda-leslie-bund:server');
const index_1 = __importDefault(require("./routes/index"));
const users_1 = __importDefault(require("./routes/users"));
const recipes_1 = __importDefault(require("./routes/recipes"));
const utils_1 = require("./utils");
// ************************************** START APOLLO ***********************************
const typeDefs_1 = __importDefault(require("./graphQlHelpers/typeDefs"));
const resolvers_1 = __importDefault(require("./graphQlHelpers/resolvers"));
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const app = (0, express_1.default)();
async function startApolloServer() {
    const server_2 = new apollo_server_express_1.ApolloServer({
        typeDefs: typeDefs_1.default,
        resolvers: resolvers_1.default,
        introspection: true,
        plugins: [
            (0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)({})
        ],
    });
    await server_2.start();
    server_2.applyMiddleware({ app, path: '/graph' });
    // ***************************************** END OF START *********************************
    // view engine setup
    app.set('views', path_1.default.join(__dirname, '../views'));
    app.set('view engine', 'jade');
    app.use((0, morgan_1.default)('dev'));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
    app.use((0, method_override_1.default)('_method'));
    app.use('/', index_1.default);
    app.use('/users', users_1.default);
    // Insert validation middleware
    app.use(utils_1.authorize);
    app.use('/recipes', recipes_1.default);
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next((0, http_errors_1.default)(404));
    });
    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
    // await new Promise<void>(resolve => server.listen(port, () => resolve())
    // app.listen({ port: 4000 }, resolve)
    // );
    // debug(`🚀 Server ready at http://localhost:${port}${server_2.graphqlPath}`);
}
;
startApolloServer();
exports.default = app;
