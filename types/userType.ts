export type userType = {
    name?: string | null,
    email?: string | null,
    image?: string | null,
    _id?: string,
    createdAt: Date,
    plan?: string,
    credits: number,
    linksCreated?: number,
    totalClicks?: number
}