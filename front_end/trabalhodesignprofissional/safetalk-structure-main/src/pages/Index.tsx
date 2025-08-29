import { useState } from "react";
import { Layout } from "@/components/Layout";
import { HomePage } from "./HomePage";
import { ReportPage } from "./ReportPage";
import { ContactsPage } from "./ContactsPage";
import { ProfilePage } from "./ProfilePage";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />;
      case "report":
        return <ReportPage />;
      case "contacts":
        return <ContactsPage />;
      case "profile":
        return <ProfilePage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderCurrentPage()}
    </Layout>
  );
};

export default Index;
