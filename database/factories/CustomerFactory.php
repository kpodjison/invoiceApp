<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
             'name' => $this->faker->name(),
             'cs_number' => $this->faker->name(),
             'email' => $this->faker->email,
            'phone' => $this->faker->phoneNumber(),
            'type' => $this->faker->word(),
            'street' => $this->faker->address(),
            'postcode' => $this->faker->postcode(),
            'city' => $this->faker->city(),

        ];
    }
}
