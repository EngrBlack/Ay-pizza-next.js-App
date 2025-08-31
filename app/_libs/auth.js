import { SupabaseAdapter } from "@auth/supabase-adapter";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "./supabase";

export const authConfig = {
  pages: { signIn: "/login" },
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },

  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }),

  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

        if (error || !data?.user) return null;
        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.fullName ?? null,
          role: data.user.user_metadata?.role ?? "customer",
        };
      },
    }),
  ],

  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },

    async jwt({ token, user, account, trigger, session }) {
      // First-time login
      if (user && account) {
        token.id = user.id;
        token.name = user.name;
        token.provider = account.provider;

        // ✅ Fetch role from Supabase instead of forcing "customer"
        const { data, error } = await supabase
          .from("users_profile")
          .select("role")
          .eq("id", user.id)
          .single();

        if (!error && data) {
          token.role = data.role;
        } else {
          // fallback if no profile found
          token.role = user.role ?? "customer";

          // also ensure row exists
          await supabase.from("users_profile").upsert({
            id: user.id,
            fullName: user.name,
            email: user.email,
            role: token.role,
          });
        }
      }

      if (trigger === "update" && session?.user) {
        token.role = session.user.role;

        const { error } = await supabase
          .from("users_profile")
          .update({ role: session.user.role })
          .eq("id", token.id);

        if (error) console.error("Error updating user_profile:", error);
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.provider = token.provider;
      }
      return session;
    },
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);

// async jwt({ token, user, account, trigger, session }) {
//   if (user && account) {
//     token.id = user.id;
//     token.role = user.role ?? "customer";
//     token.name = user.name;
//     token.provider = account.provider;

//     // Ensure profile exists
//     const { error } = await serviceRole
//       .from("user_profile")
//       .upsert({
//         id: user.id,
//         full_name: user.name,
//         role: user.role ?? "customer",
//       });

//     if (error) console.error("Error inserting user_profile:", error);
//   }

//   // 🔄 Handle profile update (e.g., user changed name)
//   if (trigger === "update" && session?.user) {
//     token.name = session.user.name;
//     token.role = session.user.role;

//     const { error } = await serviceRole
//       .from("user_profile")
//       .update({
//         full_name: session.user.name,
//         role: session.user.role,
//       })
//       .eq("id", token.id);

//     if (error) console.error("Error updating user_profile:", error);
//   }

//   return token;
// }

// import { useSession } from "next-auth/react";

// function UpdateProfileForm() {
//   const { data: session, update } = useSession();

//   async function handleSubmit(e) {
//     e.preventDefault();
//     const fullName = e.target.fullName.value;

//     await update({
//       user: { name: fullName }, // triggers jwt(trigger === "update")
//     });
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         name="fullName"
//         defaultValue={session?.user?.name ?? ""}
//         placeholder="Enter full name"
//       />
//       <button type="submit">Save</button>
//     </form>
//   );
// }
