import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { Card } from "react-bootstrap";

import ReviewFilter from "../ReviewFilter/ReviewFilter";

const ReviewDisplay = ({ reviews }) => {
    console.log(reviews);
    const { enqueueSnackbar } = useSnackbar();
    const formatDate = (input) => {
        const date = new Date(input);
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [minUsefulness, setMinUsefulness] = useState({
        value: 1,
        label: "1",
    });
    const [maxUsefulness, setMaxUsefulness] = useState({
        value: 5,
        label: "5",
    });
    const [minDifficulty, setMinDifficulty] = useState({
        value: 1,
        label: "1",
    });
    const [maxDifficulty, setMaxDifficulty] = useState({
        value: 5,
        label: "5",
    });
    const [minRating, setMinRating] = useState({ value: 1, label: "1" });
    const [maxRating, setMaxRating] = useState({ value: 5, label: "5" });

    const setMinUsefulnessHelper = (usefulness) => {
        if (usefulness.value <= maxUsefulness.value) {
            setMinUsefulness(usefulness);
        } else
            enqueueSnackbar(
                "Cannot set minimum usefulness greater than maximum usefulness",
                { variant: "error" }
            );
    };

    const setMaxUsefulnessHelper = (usefulness) => {
        if (usefulness.value >= minUsefulness.value) {
            setMaxUsefulness(usefulness);
        } else
            enqueueSnackbar(
                "Cannot set maximum usefulness less than minimum usefulness",
                { variant: "error" }
            );
    };

    const setMinDifficultyHelper = (difficulty) => {
        if (difficulty.value <= maxDifficulty.value) {
            setMinDifficulty(difficulty);
        } else
            enqueueSnackbar(
                "Cannot set minimum difficulty greater than maximum difficulty",
                { variant: "error" }
            );
    };

    const setMaxDifficultyHelper = (difficulty) => {
        if (difficulty.value >= minDifficulty.value) {
            setMaxDifficulty(difficulty);
        } else
            enqueueSnackbar(
                "Cannot set maximum difficulty less than minimum difficulty",
                { variant: "error" }
            );
    };

    const setMinRatingHelper = (rating) => {
        if (rating.value <= maxRating.value) {
            setMinRating(rating);
        } else
            enqueueSnackbar(
                "Cannot set minimum rating greater than maximum rating",
                { variant: "error" }
            );
    };

    const setMaxRatingHelper = (rating) => {
        if (rating.value >= minRating.value) {
            setMaxRating(rating);
        } else
            enqueueSnackbar(
                "Cannot set maximum rating less than minimum rating",
                { variant: "error" }
            );
    };

    useEffect(() => {
        if (minRating.value > maxRating.value) {
            console.log("min rating cannot be greater than max rating");
        } else {
            setFilteredReviews(
                reviews.filter(
                    (review) =>
                        review.usefulness >= minUsefulness.value &&
                        review.usefulness <= maxUsefulness.value &&
                        review.difficulty >= minDifficulty.value &&
                        review.difficulty <= maxDifficulty.value &&
                        review.rating >= minRating.value &&
                        review.rating <= maxRating.value
                )
            );
        }
    }, [
        reviews,
        minUsefulness,
        maxUsefulness,
        minRating,
        maxRating,
        minDifficulty,
        maxDifficulty,
    ]);

    return (
        <div>
            <h2 className="">Reviews</h2>
            <ReviewFilter
                minUsefulness={minUsefulness}
                setMinUsefulnessHelper={setMinUsefulnessHelper}
                maxUsefulness={maxUsefulness}
                setMaxUsefulnessHelper={setMaxUsefulnessHelper}
                minDifficulty={minDifficulty}
                setMinDifficultyHelper={setMinDifficultyHelper}
                maxDifficulty={maxDifficulty}
                setMaxDifficultyHelper={setMaxDifficultyHelper}
                minRating={minRating}
                setMinRatingHelper={setMinRatingHelper}
                maxRating={maxRating}
                setMaxRatingHelper={setMaxRatingHelper}
            />
            <div className="w-144 max-w-full h-96 overflow-y-scroll mx-auto mt-4 flex flex-col justify-around border-2 border-black">
                {filteredReviews.map((review, index) => (
                    <Card
                        key={index}
                        className={`w-112 h-fit mx-auto mt-4 ${
                            index === reviews.length - 1 && "mb-4"
                        } flex flex-col flex-around border-1 border-gray-200 rounded-md bg-purple-100`}
                    >
                        <Card.Header>
                            <div className="w-96 mx-2 flex justify-between">
                                <p className="my-auto text-xl font-semibold text-right">
                                    {review.anon ? "Anonymous" : review.user}
                                </p>
                                <p className="my-auto text-xl font-semibold text-right">
                                    {formatDate(review.date)}
                                </p>
                            </div>
                        </Card.Header>
                        <Card.Body className="my-auto bg-purple-100">
                            <Card.Text className="mx-2 text-xl text-left">
                                Professor{" "}
                                <span className="font-semibold">
                                    {review.professor}
                                </span>
                            </Card.Text>

                            <div className="w-96 mx-2 flex flex-wrap justify-between text-xl">
                                <Card.Text>
                                    Usefulness:{" "}
                                    <span className="text-2xl font-semibold">
                                        {review.usefulness}
                                    </span>
                                    /5
                                </Card.Text>
                                <Card.Text>
                                    Difficulty:{" "}
                                    <span className="text-2xl font-semibold">
                                        {review.difficulty}
                                    </span>
                                    /5
                                </Card.Text>
                                <Card.Text>
                                    Rating:{" "}
                                    <span className="text-2xl font-semibold">
                                        {review.rating}
                                    </span>
                                    /5
                                </Card.Text>
                            </div>

                            {review.review && (
                                <Card.Text className="mx-2 text-xl text-start">
                                    {review.review}
                                </Card.Text>
                            )}
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

ReviewDisplay.propTypes = {
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            user: PropTypes.string.isRequired,
            anon: PropTypes.bool.isRequired,
            bu_email: PropTypes.string.isRequired,
            course_id: PropTypes.string.isRequired,
            professor: PropTypes.string.isRequired,
            usefulness: PropTypes.number.isRequired,
            difficulty: PropTypes.number.isRequired,
            rating: PropTypes.number.isRequired,
            review: PropTypes.string,
            date: PropTypes.string.isRequired,
        })
    ),
};

export default ReviewDisplay;
