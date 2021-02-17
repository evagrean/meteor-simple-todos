//  Configure accounts-ui to use usernames instead of mail
import { Accounts } from "meteor/accounts-base";

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY",
});
