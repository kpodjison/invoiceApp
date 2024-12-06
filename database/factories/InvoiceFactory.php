<?php

namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Invoice>
 */
class InvoiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'invoice_date' => $this->faker->date(),
            'inv_num' => $this->faker->sentence(),
            'description' => $this->faker->sentence(),
            'customer_id' => Customer::factory(),
            'status' => $this->faker->sentence(),
            'total' => $this->faker->randomFloat(),
        ];
    }
}
