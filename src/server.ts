import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ServiceRoute } from '@routes/service.route'
//import { ValidateEnv } from '@utils/validateEnv';

// TODO разобраться с валидацией
//ValidateEnv();

const app = new App([
    new AuthRoute(), 
    new UserRoute(),
    new ServiceRoute()
]);

app.listen();
