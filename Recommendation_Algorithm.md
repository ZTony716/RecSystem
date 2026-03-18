This project implements a hybrid recommendation system that combines rule-based logic, weighted user behavior, and product relationship analysis.
Instead of relying on a single method, the system uses multiple recommendation strategies to improve relevance, explainability, and user experience.

### User Behavior Tracking

The recommendation engine is built on user interaction data stored in PostgreSQL.
The system records the following event types:

- `product_view`

- `add_to_cart`

- `purchase_intent`

These events represent different levels of user interest.
To reflect their importance, the system assigns different weights:

- `product_view = 1`

- `add_to_cart = 3`

- `purchase_intent = 5`

This weighted design allows the system to distinguish between casual browsing and stronger purchase-related intent.

---

### Weighted Popular Recommendation

The homepage recommendation module uses a weighted popularity score instead of simple page-view counts.

For each product, the system calculates:

``` weighted_score =
1 × product_view
+ 3 × add_to_cart
+ 5 × purchase_intent ```

Products are ranked by this score in descending order.
This approach improves over traditional popularity-based recommendation because it considers both engagement volume and engagement value.

Purpose:
To recommend globally popular products with stronger behavioral signals.

3. Personalized Recommendation

The personalized recommendation module identifies a user’s preferred product categories based on weighted historical behavior.

Step 1: Category Preference Scoring

The system aggregates user events by category and calculates a weighted preference score:

category_preference_score =
1 × product_view
+ 3 × add_to_cart
+ 5 × purchase_intent

The top 2 categories with the highest scores are selected as the user’s main interest categories.

Step 2: Candidate Product Selection

The system retrieves products from those preferred categories while excluding items the user has already interacted with.

Step 3: Ranking

Candidate products are ranked using:

category priority

overall weighted popularity

product recency/order fallback

Purpose:
To generate personalized recommendations that reflect both user preference and product popularity.

4. Similar Product Recommendation

On the product detail page, the system provides similar product recommendations based on:

same category

closest price distance

product view popularity as a secondary ranking factor

This strategy is content-oriented and helps users discover alternatives related to the current product.

Purpose:
To recommend substitute or comparable products.

5. Also-Viewed Recommendation

The system also supports a customers also viewed strategy.

For a target product:

Find users who viewed that product

Find other products viewed by the same users

Count co-view frequency

Rank products by co-view count

This is a lightweight collaborative-filtering style approach based on behavioral co-occurrence.

Purpose:
To capture product relationships from real user browsing patterns.

6. Hybrid Recommendation Design

The overall recommendation architecture is hybrid because different modules serve different scenarios:

Homepage: Weighted Popular Recommendation

User-based page: Personalized Recommendation

Product detail page: Similar Products + Also Viewed

This design improves system robustness and makes recommendations more context-aware.

7. Why This Approach Was Chosen

This project does not rely on a black-box AI model as the core ranking engine.
Instead, it uses a structured and explainable recommendation design based on SQL and behavioral data.

Advantages of this approach include:

easy to implement and maintain

fully explainable recommendation logic

suitable for small-to-medium project datasets

easy to demonstrate in a full-stack application

strong foundation for future AI enhancement

8. Future Improvements

Possible next steps for the recommendation algorithm include:

time-decay weighting for recent behavior

multi-source recall and re-ranking

diversity control in recommendation lists

search-history-aware ranking

AI-generated recommendation explanations

natural-language intent understanding with LLM support

These extensions would further improve personalization and recommendation quality while keeping the current hybrid framework.
