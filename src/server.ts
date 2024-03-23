import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
//import { ValidateEnv } from '@utils/validateEnv';

// TODO разобраться с валидацией
//ValidateEnv();

const app = new App([new AuthRoute(), new UserRoute()]);

app.listen();
