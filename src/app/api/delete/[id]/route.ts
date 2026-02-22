import { User } from '@/models/UserModel/user';
import { Url } from '@/models/urlModel/Url';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const id = await params.id;
        const url = await Url.findOneAndDelete({ _id: id });
        const oneHour = 1000 * 60 * 60;
        const currentTime = Date.now();
        const createdAt = new Date(url.createdAt).getTime();
        if (currentTime - createdAt <= oneHour) {
            const document = await User.findOneAndUpdate({ _id: url.createdBy }, { $inc: { credits: 1 } }, { new: true });
            console.log(document)
        }
        return NextResponse.json({ message: "deleted url", url })
    } catch (error: unknown) {
        console.log("error in delete route", error);
    }
}