import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NavBar = () => {
  return (
    <div className="absolute border-2 bottom-0 self-center my-2">
      {/* teste */}
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default NavBar;
