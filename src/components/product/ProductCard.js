import { ShoppingBag } from "@mui/icons-material";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    IconButton,
    Rating,
    Skeleton,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../app/slices/cart/cartSlice";
import { toast } from "react-toastify";

const ProductCard = (props) => {
    const theme = useSelector((state) => state.theme.theme);
    const [productOnFocus, setProductOnFocus] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = (item) => {
        dispatch(
            addToCart({
                id: item.id,
                title: item.title,
                price: item.price,
                imageUri: item.imageUri,
                category: item.category,
                quantity: 1,
            })
        );
        toast.success(`${item.title} added to cart`);
    };


    return (
        <Card
            sx={{
                width: "16rem",
                border: 1,
                borderColor: `${theme === "dark" ? "#757575" : "divider"}`,
                borderRadius: "1rem",
                "& .MuiCardContent-root: last-child": {
                    paddingBottom: "0.5rem",
                },
                position: "relative",
                overflow: "hidden",
                display: "flex",
            }}
        >
            <CardActionArea
                onMouseEnter={() => setProductOnFocus(true)}
                onMouseLeave={() => setProductOnFocus(false)}
                onClick={(event) => {
                    event.preventDefault();
                    navigate(`/product/${props.id}`, {
                        state: {
                            id: props.id,
                            title: props.title,
                            price: props.price,
                            imageUri: props.imageUri,
                            category: props.category,
                            rating: props.rating,
                            numRatings: props.numRatings,
                        },
                    });
                    setProductOnFocus(false);
                }
                }
            >
                {!props.loading && <IconButton
                    color="inherit"
                    onMouseDown={(event) => event.stopPropagation()}
                    onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        handleAddToCart({
                            id: props.id,
                            title: props.title,
                            price: props.price,
                            imageUri: props.imageUri,
                            category: props.category,
                        });
                    }}
                    sx={{
                        display: `${productOnFocus ? "span" : "none"}`,
                        position: "absolute",
                        borderRadius: "50%",
                        width: "2.5rem",
                        height: "2.5rem",
                        alignSelf: "end",
                        zIndex: 1,
                        marginLeft: "auto",
                        marginRight: "0.5rem",
                        marginBottom: "0.5rem",
                    }}
                    className="inset-0 rounded-full flex items-end p-4"
                >
                    <ShoppingBag
                        sx={{ color: `${theme === "dark" ? "#d1d5db" : "#6b7280"}` }}
                    />
                </IconButton>}
                {props.loading ? (
                    <Skeleton variant="rectangular" animation="wave" height={"18rem"} />
                ) : (
                    <CardMedia
                        src={props.imageUri}
                        alt={props.title}
                        component="img"
                        width={"100%"}
                        sx={{
                            height: "18rem",
                            objectFit: "cover",
                            borderRadius: "1rem 1rem 0rem 0rem",
                            borderColor: "divider",
                            borderWidth: 1,
                            borderStyle: "solid",
                        }}
                    />
                )}
                <CardContent
                    sx={{
                        backgroundColor: `${theme === "dark" ? "#424242" : "#fff"}`,
                        padding: "0.5rem",
                    }}
                >
                    <React.Fragment>
                        {props.loading ? (
                            <React.Fragment>
                                <Skeleton
                                    animation="wave"
                                    height={"1rem"}
                                    style={{
                                        marginBottom: 6,
                                        backgroundColor: `${theme === "dark" ? "#757575" : "#e0e0e0"
                                            }`,
                                    }}
                                />
                                <Skeleton
                                    animation="wave"
                                    height={"1rem"}
                                    width="80%"
                                    style={{
                                        backgroundColor: `${theme === "dark" ? "#757575" : "#e0e0e0"
                                            }`,
                                    }}
                                />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <div className={`flex justify-between items-center gap-2`}>
                                    <h3
                                        className={`text-md font-medium ${theme === "dark" ? "text-white" : "text-black"
                                            } text-start truncate`}
                                    >
                                        {props.title}
                                    </h3>
                                    <div
                                        className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-black"
                                            }`}
                                    >
                                        ₹{props.price.toFixed(2)}
                                    </div>
                                </div>
                                <p
                                    className={`text-sm text-start ${theme === "dark" ? "text-gray-300" : "text-gray-500"
                                        }`}
                                >
                                    {props.category}
                                </p>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "start",
                                        marginTop: "0.5rem",
                                        gap: "0.5rem",
                                    }}
                                >
                                    <Rating
                                        name={`${props.title}-rating`}
                                        value={props.rating}
                                        precision={0.5}
                                        readOnly
                                        size="small"
                                        sx={{
                                            color: `${theme === "dark" ? "#ffb300" : "#ff9800"}`,
                                        }}
                                        max={5}
                                    />
                                    <span
                                        className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-500"
                                            }`}
                                    >
                                        ({props.numRatings})
                                    </span>
                                </Box>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
export default ProductCard;

ProductCard.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUri: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    numRatings: PropTypes.number,
    loading: PropTypes.bool,
};
ProductCard.defaultProps = {
    id: 0,
    title: "Smart Watch",
    price: 25499,
    imageUri: "/product-demo-image.jpg",
    category: "Electronics",
    rating: 4.6,
    loading: false,
    numRatings: 100,
};
