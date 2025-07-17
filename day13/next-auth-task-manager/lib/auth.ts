import type { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

interface UserRole {
  id: string | number;
  name: string;
}

interface UserType {
  id: string;
  name: string;
  email: string;
  avatar: string;
  accessToken: string;
  refreshToken: string;
  roles: UserRole[];
}

export const authOptions: NextAuthOptions = {
  debug: true,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const payload = {
          email: credentials.email,
          password: credentials.password,
        };

        const res = await fetch(`${process.env.NEXTAUTH_URL}/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            username: credentials.email,
            password: credentials.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const tokens = await res.json();

        if (!res.ok) {
          throw new Error("UnAuthorized");
        }
        if (tokens) {
          return {
            id: tokens.loggedInUser.id,
            name: tokens.loggedInUser.name,
            email: tokens.loggedInUser.email,
            avatar: tokens.loggedInUser.avatar,
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            roles: tokens.loggedInUser.roles, // Thêm roles từ API response
          } as UserType;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          roles: user.roles,
        };
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      const userObject: UserType = {
        id: token.id as string,
        avatar: (token.avatar as string) ?? "",
        name: (token.name as string) ?? "",
        accessToken: (token.accessToken as string) ?? "",
        refreshToken: (token.refreshToken as string) ?? "",
        email: (token.email as string) ?? "",
        roles: (token.roles as UserRole[]) ?? [],
      };

      session.user = userObject;
      return session;
    },
  },
};

declare module "next-auth" {
  interface User extends UserType {}
}

declare module "next-auth" {
  interface Session {
    user: UserType & {
      accessToken?: string;
      roles?: UserRole[];
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends UserType {
    roles?: UserRole[];
  }
}