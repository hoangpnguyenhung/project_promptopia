import "next-auth";
declare module "next-auth" {
  //thêm thuộc tính và types id cho session
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
    };
  }

  interface Profile {
    id: string;
    name: string;
    email: string;
    picture?: string; // Thêm trường picture
  }
}
