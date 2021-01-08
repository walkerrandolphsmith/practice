import test from 'ava';
import {
  UserService,
  LocalizationService,
  MailerService,
  Facade
} from './index';

test("I can rely on the facade to coordinate work between the user service, localization service and mailer service to send a reset password email", (t) => {
  const facade = new Facade(new UserService(), new LocalizationService(), new MailerService());
  t.is(facade.sendPasswordResetEmail("1").email, "account@domain.com");
  t.is(facade.sendPasswordResetEmail("1").message, "enReset");

  t.is(facade.sendPasswordResetEmail("2").email, "account2@domain.com");
  t.is(facade.sendPasswordResetEmail("2").message, "enUSReset");

  t.is(facade.sendVerifyAccountEmail("1").email, 'account@domain.com');
  t.is(facade.sendVerifyAccountEmail("1").message, 'newAccountsHaventSetPreferences');
})