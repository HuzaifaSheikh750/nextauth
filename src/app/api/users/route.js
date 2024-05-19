import { createUserWithAccount, getUserByEmail } from "../../utils/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const post = async (req) => {
    try {
        const { name, email, password } = await req.json();
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return NextResponse.json({ 
                Message: "User already exists"
            }, { status: 400 });
        }  

        const hashedPassword = await bcrypt.hash(password, 10);
       const newUser = await createUserWithAccount({
            name,
            email,
            password: hashedPassword,
        });
        return NextResponse.json({ 
            Message: "User created successfully",
            data : {
                ...newUser,
            }
        }, { status: 201 });


    } catch (error) {
        return NextResponse.json({ 
            Message: "Error", error
        }, { status: 500 });
    }
}