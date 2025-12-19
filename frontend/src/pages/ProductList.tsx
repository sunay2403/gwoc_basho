import Filter from "../components/Filter.tsx";
import Card from "../components/card.tsx";

function ProductList(){
    return (
        <div className="flex">
            <Filter/>
            <div className=" w-5xl p-2 transparent grid grid-cols-3 gap-2">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    );
}

export default ProductList;