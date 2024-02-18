import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import styles from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchMeals = async () => {
            setIsLoading(true);
            const response = await fetch('http://localhost:8080/api/meals');

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            const loadedMeals = responseData.data;

            setMeals(loadedMeals);
            setIsLoading(false);
        }

        fetchMeals().catch(error => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    if (isLoading) {
        return (
            <section className={styles.meals}>
                <p className={styles['meals-loading']}>Loading...</p>
            </section>
        )
    }

    if (httpError) {
        return (
            <section className={styles.meals}>
                <p className={styles['meals-error']}>{httpError}</p>
            </section>
        )
    }

    const mealsList = meals.map((meal) => {
        return (
            <MealItem
                key={meal.id}
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
            />
        )
    });

    return (
        <section className={styles.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    )
}

export default AvailableMeals;