"use client";

import { authClient } from "@/lib/auth-client";

export const HomeView = () => {
    const { data: session, isPending } = authClient.useSession();

    const username = session?.user?.name ?? "Guest";

    if (isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-black text-lg">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-primary">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        Welcome Home, {"  "}<p className="font-bold">{username}</p>
                    </h1>
                    <p className="text-gray-700 leading-relaxed text-lg">
                        Create agents,{"  "}create meeting,{"  "} join meetings{"  "} and{"  "} get your work done.
                    </p>
                </div>
            </div>
        </div>
    );
};