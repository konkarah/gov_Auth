import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT_SECRET } from "src/env";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: JWT_SECRET,
		});
	}

	async validate(payload: any) {
		const newPayload = {
			id: payload.sub,
			...payload,
		};
		return newPayload;
	}
}
//src/auth/jwt.strategy.ts
// import { Injectable } from "@nestjs/common";
// import { PassportStrategy } from "@nestjs/passport";
// import { ExtractJwt, Strategy } from "passport-jwt";
// import { FirebaseService } from './firebase.service'; // Import your Firebase service
// import { JWT_SECRET } from "src/env";

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly firebaseService: FirebaseService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: JWT_SECRET, // Set to null because we use Firebase Admin to validate
//     });
//   }

//   async validate(payload: any) {
//     const idToken = payload?.token; // Ensure that the payload contains a token

//     try {
//       // Verify the token using Firebase Admin
//       const decodedToken = await this.firebaseService.verifyIdToken(idToken);
//       return {
//         id: decodedToken.uid,
//         ...decodedToken,
//       };
//     } catch (error) {
//       throw new Error('Unauthorized');
//     }
//   }
// }

