import { order, inventories } from "../configs/db.js";

const ordersRouteController = {
    //Get orders with product description
    getOrders: async (req, res) => {
        try {
            //Get orderList
            const orderList = await order.find().toArray();

            //add description to orderList
            const fullList =
                await Promise.all(
                    orderList.map(async (order) => {
                        const product = await inventories.findOne({ sku: order.item });
                        return { ...order, description: product.description };
                    })
                );

            res.status(200).json({
                message: "Orders loaded successfully",
                data: fullList,
            });

        } catch (error) {
            res.status(500).json({
                message: error.message,
                data: null,
            });
        }
    }
}

export default ordersRouteController;