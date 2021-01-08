interface MessageReceipt {
  email: string,
  message: string,
}

/**
 * Subsystem One has a single responsibility.
 */
export class UserService {
  users: Object;
  constructor() {
    this.users = {
      1: { preferences: { language: 'en' }, email: "account@domain.com" },
      2: { preferences: { language: 'en-US' }, email: "account2@domain.com" }
    }
    this.getUser = this.getUser.bind(this);
  }
  getUser(userId: string) {
    return this.users[userId];
  }
}

export class LocalizationService {
  localizations: Object;
  constructor() {
    this.localizations = {
      en: {
        'resetPasswordEmail': "enReset",
      },
      'en-US': {
        'resetPasswordEmail': "enUSReset",
      }
    }
    this.getLocaization = this.getLocaization.bind(this);
  }
  getLocaization(localizationKey: string, languageCode = 'en') : string {
    return this.localizations[languageCode][localizationKey];
  }
}

export class MailerService {
  resetEmailLocalizationKey = 'resetPasswordEmail';
  sendEmail(email: string, message: string) : MessageReceipt {
    return { email, message };
  }
}

/**
 * In order to send a password reset email for an existing user we want to make sure the user's language preferences are respsected in the email.
 * We'll need to get the language perferences of the user, translate the message based on the language, and actually send the email.
 * We have three services when used together in the correct way can send the email to the correct user respecting their language preferences.
 */
export class Facade {
  userService : UserService;
  locService : LocalizationService;
  mailerService: MailerService;
  constructor(
    userService : UserService,
    locService: LocalizationService,
    mailerService : MailerService,
  ) {
    this.userService = userService;
    this.locService = locService;
    this.mailerService = mailerService;
    this.sendPasswordResetEmail = this.sendPasswordResetEmail.bind(this);
  }

  sendPasswordResetEmail(userId : string) : MessageReceipt {
    const user = this.userService.getUser(userId);
    const lanaguage = user.preferences.language;
    const email = user.email;
    const localizationKey = this.mailerService.resetEmailLocalizationKey;
    const message = this.locService.getLocaization(localizationKey, lanaguage);
    return this.mailerService.sendEmail(email, message);
  }

  sendVerifyAccountEmail(userId: string) : MessageReceipt {
    const user = this.userService.getUser(userId);
    const email = user.email;
    const message = 'newAccountsHaventSetPreferences';
    return this.mailerService.sendEmail(email, message);
  }
}