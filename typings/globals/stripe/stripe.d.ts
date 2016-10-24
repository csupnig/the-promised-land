// Type definitions for Google Analytics (Classic and Universal)
// Project: https://developers.google.com/analytics/devguides/collection/gajs/, https://developers.google.com/analytics/devguides/collection/analyticsjs/method-reference
// Definitions by: Ronnie Haakon Hegelund <http://ronniehegelund.blogspot.dk>, Pat Kujawa <http://patkujawa.com>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

interface IStripeInstance {
    card: Stripe.ICardService;
    setPublishableKey(key : string) : void;
}

declare module Stripe {

    interface ITokenCard {
        name ?: string;
        address_line1? : string;
        address_line2? : string;
        address_city? : string;
        address_state? : string;
        address_zip? : string;
        address_country? : string;
        country: string;
        exp_month: number;
        exp_year: number;
        last4: string;
        object: string;
        brand: string;
        funding: string;
    }

    interface IStripeTokenRequest {
        number : string;
        cvc : string;
        exp_month : number;
        exp_year : number;
        name ?: string;
        address_line1? : string;
        address_line2? : string;
        address_city? : string;
        address_state? : string;
        address_zip? : string;
        address_country? : string;
    }

    interface ICardService {

        createToken(tokenRequest : IStripeTokenRequest, handler : (status : IStripeStatus, response : IStripeTokenResponse) => void) : void;
        validateCardNumber(number : string): boolean;
        validateExpiry(month : string, year : string) : boolean;
        validateCVC(cvc : string) : boolean;
        cardType(number : string) : string;
    }

    interface IStripeStatus {
        type : string;
        code : number;
        param : any;
        message? : string;
    }

    interface IStripeTokenResponse {
        id : string; // Token identifier
        card: ITokenCard;
        created: number; // Timestamp of when token was created
        livemode: boolean; // Whether this token was created with a live API key
        type: string;
        object: string; // Type of object, always "token"
        used: boolean; // Whether this token has been used
        error? : IStripeStatus;
    }
}

declare var Stripe : IStripeInstance;
