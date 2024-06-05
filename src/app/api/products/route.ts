export async function Get() {
    return Response.json({ message: "Hello Word!" });
} import data from './data.json'

export async function GET() {
    return Response.json(data.products)
}