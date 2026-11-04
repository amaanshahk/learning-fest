# RAG Failure & Hallucination Investigation

## 1. Objective

Evaluate an AtlasDesk RAG pipeline by testing supported, unsupported, ambiguous and conflicting questions. Identify failures and trace their likely causes to chunking, retrieval, context injection or generation.

## 2. Experimental Setup

- Knowledge base: 6 Markdown documents
- Indexed chunks: 25 paragraph-based chunks
- Vector database: ChromaDB
- Embedding model: all-MiniLM-L6-v2
- Retrieval: Top 5 chunks
- LLM provider: Groq
- Model: openai/gpt-oss-20b
- Generation temperature: 0
- Test cases: 8

## 3. Test Results

| ID | Category | Result |
|---|---|---|
| Q1 | Supported | Partial answer; relevant subscription details were missed |
| Q2 | Supported | Correct answer |
| Q3 | Unsupported | Correctly abstained |
| Q4 | Unsupported | Correctly abstained |
| Q5 | Ambiguous | Failed to retrieve plan-specific user limits |
| Q6 | Ambiguous | Ignored delivery information in retrieved context |
| Q7 | Conflicting | Correctly identified 14-day vs 30-day refund conflict |
| Q8 | Conflicting | Correctly identified 5 vs 10 member-limit conflict |

## 4. Failure Analysis

### Failure 1: Q1 — Incomplete Standard-plan information

**Pipeline stage:** Retrieval

The question asked about Standard-plan features. The retrieved top-5 chunks came from product_overview.md, shipping_and_onboarding.md and support_operations.md.

The relevant subscription_policy.md paragraph describing shared inboxes, team collaboration and basic performance reports was not retrieved.

The model therefore produced a partially correct answer using the available context, but omitted relevant plan features.

**Suspected root cause:** The relevant paragraph did not rank within the top-5 retrieval results.

**Possible improvement:** Increase retrieval depth or improve query formulation and evaluate whether the missing source is retrieved.

### Failure 2: Q5 — Missing plan-specific user limits

**Pipeline stage:** Retrieval

The question asked how many users AtlasDesk supports without specifying a subscription plan.

The retrieved chunks included general product information and one subscription-policy paragraph, but did not include the paragraphs containing the actual Standard-plan limits from subscription_policy.md and customer_faq.md.

The model responded that the maximum number of users was unavailable.

**Suspected root cause:** The broad query did not retrieve the relevant chunks. The wording "users" may also have contributed to a mismatch with the source wording "team members".

**Possible improvement:** Use query expansion with terms such as "team members", "seats" and "Standard plan". Retrieve additional candidate chunks and evaluate relevance before generation.

### Failure 3: Q6 — Ignored delivery information

**Pipeline stage:** Generation

The retrieved context contained both:

- shipping_and_onboarding.md: 3–5 business days.
- support_operations.md: 5–7 business days.

Despite receiving both statements, the model responded that no delivery information was available.

It failed to recognize that delivery referred to the optional DeskHub device and failed to identify the disagreement between the two sources.

**Suspected root cause:** The generation stage did not correctly interpret and use relevant information already present in its context.

**Possible improvement:** Strengthen generation instructions to require the model to inspect every supplied source, distinguish the cloud service from the optional hardware product, and explicitly report contradictory statements.

## 5. Successful Behaviours

- Q2 correctly explained the password-reset procedure.
- Q3 correctly abstained from inventing Salesforce integration support.
- Q4 correctly abstained from inventing a password-storage encryption algorithm.
- Q7 identified the conflicting 14-day and 30-day refund policies.
- Q8 identified the conflicting 5-member and 10-member limits.

## 6. Root-Cause Summary

| Failure | Pipeline stage | Main issue |
|---|---|---|
| Q1 | Retrieval | Relevant subscription feature chunk was missed |
| Q5 | Retrieval | Relevant seat-limit chunks were missed |
| Q6 | Generation | Relevant retrieved context was ignored |

No clear chunking or context-injection failure was established from these three traces. The retrieved paragraph chunks retained their source text, and the Q6 trace confirms that both delivery statements reached the generation stage.

## 7. Recommended Improvements

1. Experiment with larger retrieval depth and measure whether relevant chunks enter the context.
2. Use query expansion for ambiguous or differently worded questions.
3. Improve generation instructions for source comparison, ambiguity handling and contradiction detection.
4. Preserve source names in the prompt so conflicting claims can be attributed.
5. Evaluate retrieval and generation independently rather than judging only the final answer.

## 8. Conclusion

The experiment identified three failures across two pipeline stages: retrieval and generation.

Q1 and Q5 demonstrate that relevant information can be absent from the retrieved context even when it exists in the knowledge base. Q6 demonstrates that retrieving relevant information does not guarantee that the LLM will use it correctly.

The system handled unsupported questions and explicit contradictions reasonably well, but requires improvements in retrieval coverage and context-grounded generation.

These findings are based on one run of eight questions against a small synthetic knowledge base.

## 9. Follow-up Experiments and Improvements

Three controlled experiments were performed after the baseline run.

### Increased Retrieval Depth

Retrieval depth was increased from Top-5 to Top-8 for Q1, Q5 and Q6.

- Q1 remained incomplete.
- Q5 remained unanswered.
- Q6 improved: the model identified both delivery estimates and reported their disagreement.

### Query Expansion

For Q5, the query was expanded with terms such as "team members", "seats" and "user limit".

The retriever returned both relevant chunks:
- subscription_policy_2: 5 team members.
- customer_faq_2: 10 team members.

The model correctly identified the conflict.

### Targeted Retrieval for Q1

A targeted query containing "shared inboxes", "team collaboration" and "basic performance reports" retrieved subscription_policy_4 at rank 1.

This confirms that the relevant feature information existed in the knowledge base but was missed by the original query.

The targeted retrieval result was verified, but a complete generation retest for Q1 was not performed.

### Improvement Summary

| Experiment | Outcome |
|---|---|
| Top-8 retrieval | Improved Q6 |
| Q5 query expansion | Retrieved both conflicting limits |
| Targeted Q1 query | Retrieved the missing feature paragraph |

These experiments show that retrieval depth and query formulation influence retrieval quality. They also demonstrate that retrieving relevant context does not guarantee correct generation.

## 9. Follow-up Experiments and Improvements

Three controlled experiments were performed after the baseline run.

### Increased Retrieval Depth

Retrieval depth was increased from Top-5 to Top-8 for Q1, Q5 and Q6.

- Q1 remained incomplete.
- Q5 remained unanswered.
- Q6 improved: the model identified both delivery estimates and reported their disagreement.

### Query Expansion

For Q5, the query was expanded with terms such as "team members", "seats" and "user limit".

The retriever returned both relevant chunks:
- subscription_policy_2: 5 team members.
- customer_faq_2: 10 team members.

The model correctly identified the conflict.

### Targeted Retrieval for Q1

A targeted query containing "shared inboxes", "team collaboration" and "basic performance reports" retrieved subscription_policy_4 at rank 1.

This confirms that the relevant feature information existed in the knowledge base but was missed by the original query.

The targeted retrieval result was verified, but a complete generation retest for Q1 was not performed.

### Improvement Summary

| Experiment | Outcome |
|---|---|
| Top-8 retrieval | Improved Q6 |
| Q5 query expansion | Retrieved both conflicting limits |
| Targeted Q1 query | Retrieved the missing feature paragraph |

These experiments show that retrieval depth and query formulation influence retrieval quality. They also demonstrate that retrieving relevant context does not guarantee correct generation.
