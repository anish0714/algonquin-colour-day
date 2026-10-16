import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FoodSection from './FoodSection.jsx'
import data from '../data/itinerary.json'

const mealPanel = (name) => screen.getByRole('heading', { name: new RegExp(name) }).closest('section')
const placeNames = (panel) => within(panel).queryAllByRole('heading', { level: 4 }).map((h) => h.textContent)

describe('FoodSection', () => {
  it('lists every lunch and dinner place by default', () => {
    render(<FoodSection food={data.food} />)
    const lunch = data.food.places.filter((p) => p.meals.includes('lunch'))
    const dinner = data.food.places.filter((p) => p.meals.includes('dinner'))
    expect(placeNames(mealPanel('Lunch'))).toHaveLength(lunch.length)
    expect(placeNames(mealPanel('Dinner'))).toHaveLength(dinner.length)
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('offers a filter button for each cuisine, including Indian', () => {
    render(<FoodSection food={data.food} />)
    const cuisines = new Set(data.food.places.map((p) => p.cuisine))
    for (const c of cuisines) expect(screen.getByRole('button', { name: c })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Indian' })).toBeInTheDocument()
  })

  it('filters to Indian and shows Marigold for lunch and dinner', async () => {
    const user = userEvent.setup()
    render(<FoodSection food={data.food} />)
    await user.click(screen.getByRole('button', { name: 'Indian' }))

    expect(screen.getByRole('button', { name: 'Indian' })).toHaveAttribute('aria-pressed', 'true')
    expect(placeNames(mealPanel('Lunch'))).toEqual(['Marigold'])
    expect(placeNames(mealPanel('Dinner'))).toEqual(['Marigold'])
  })

  it('says so when a cuisine has nothing for a meal', async () => {
    const user = userEvent.setup()
    render(<FoodSection food={data.food} />)
    await user.click(screen.getByRole('button', { name: 'Thai' }))

    expect(within(mealPanel('Lunch')).getByText(/no picks for this cuisine/i)).toBeInTheDocument()
    expect(placeNames(mealPanel('Dinner'))).toEqual(["Seng's Authentic Thai"])
  })

  it('shows a chicken and a vegan pick on every card', () => {
    render(<FoodSection food={data.food} />)
    const dinnerCards = within(mealPanel('Dinner')).getAllByRole('heading', { level: 4 })
    expect(within(mealPanel('Dinner')).getAllByText('Chicken')).toHaveLength(dinnerCards.length)
    expect(within(mealPanel('Dinner')).getAllByText('Vegan')).toHaveLength(dinnerCards.length)
  })
})
