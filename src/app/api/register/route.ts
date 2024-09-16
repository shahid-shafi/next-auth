import { createUserService } from '@/db/user/user.service';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  try {
    const createData = await request.json();
    await createUserService(createData);
    return NextResponse.json(
      { message: 'User registered successfully', success: true },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error, status: false });
  }
};
