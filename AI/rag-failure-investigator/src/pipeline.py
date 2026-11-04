import json
from pathlib import Path

from retrieval import retrieve_context
from generation import generate_answer

BASE_DIR = Path(__file__).parent.parent
QUESTIONS_FILE = BASE_DIR / "evaluation" / "questions.json"
RESULTS_FILE = BASE_DIR / "evaluation" / "results.json"


def run_pipeline():
    with open(QUESTIONS_FILE, encoding="utf-8") as file:
        questions = json.load(file)

    results = []

    for test in questions:
        print(f"\n{'=' * 70}")
        print(f"{test['id']}: {test['question']}")

        contexts = retrieve_context(test["question"])
        answer = generate_answer(test["question"], contexts)

        result = {
            "id": test["id"],
            "category": test["category"],
            "question": test["question"],
            "retrieved_contexts": contexts,
            "injected_context": contexts,
            "final_answer": answer
        }

        results.append(result)

        print("\nRetrieved sources:")
        for context in contexts:
            print(
                f"- {context['source']} | "
                f"{context['id']} | "
                f"distance: {context['distance']:.4f}"
            )

        print("\nGenerated answer:")
        print(answer)

    with open(RESULTS_FILE, "w", encoding="utf-8") as file:
        json.dump(results, file, indent=4)

    print(f"\nFull execution traces saved to {RESULTS_FILE}")


if __name__ == "__main__":
    run_pipeline()
