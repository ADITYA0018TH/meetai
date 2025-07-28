"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

/**
 * Renders the authentication interface, allowing users to sign up, log in, and manage their session.
 *
 * Displays user creation and login forms when no session exists. If a user is logged in, shows their name and a sign-out option.
 */
export default function Home() {

  const { data: session } = authClient.useSession()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email({
      email,
      name,
      password
    }, {
      onError: (error) => {
        window.alert
      },
      onSuccess: () => {
        window.alert("Success creating user");
      }
    });
  };

  const onLogin = () => {
    authClient.signIn.email({
      email,
      password
    }, {
      onError: (error) => {
        window.alert("Something went wrong: ");
      },
      onSuccess: () => {
        window.alert("Successfully logged in");
      }
    });
  };

  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-10">
      <div className="p-4 flex flex-col gap-4">
        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <Button onClick={onSubmit}>
          Create User
        </Button>
      </div>

      <div className="p-4 flex flex-col gap-4">
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <Button onClick={onLogin}>
          Login
        </Button>
      </div>
    </div>
  );
};
