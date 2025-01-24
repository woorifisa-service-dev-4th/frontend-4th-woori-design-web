export default async function Detail({ params }) {
    const paramsValue = await params;

    console.log(paramsValue);

    return (
        <div>
            <h1>Detail page</h1>
        </div>
    );
}