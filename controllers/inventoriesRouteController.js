import { inventories } from "../configs/db.js";

const inventoriesRouteController = {
    getInventories: async (req, res) => {
        try {
            const qty = req.query.qty;

            if (qty === "low") {
                const lowQtyInventories = await inventories
                    .find({ instock: { $lt: 100 } })
                    .toArray();

                res.status(200).json({
                    message: "Low quantity inventories loaded successfully",
                    data: lowQtyInventories,
                });
            } else {
                const allInventories = await inventories.find().toArray();

                res.status(200).json({
                    message: "All inventories loaded successfully",
                    data: allInventories,
                });
            }
        } catch (error) {
            res.status(500).json({
                message: error.message,
                data: null,
            });
        }
    },
};

export default inventoriesRouteController;
