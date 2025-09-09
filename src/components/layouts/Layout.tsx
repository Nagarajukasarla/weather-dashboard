import React from "react";
import Content from "@/components/layouts/Content";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

/**
 * App layout component
 */
const AppLayout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="flex-shrink-0">
                <Header />
            </header>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto py-4 px-4 md:px-8 md:py-6 lg:px-12">
                <Content />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default AppLayout;
