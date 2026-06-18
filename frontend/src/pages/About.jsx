import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useToast } from "../context/ToastContext";

const highlights = [
  {
    title: "One place for trip planning",
    description:
      "Browse attractions, stays, maps, and travel details without jumping between tabs.",
  },
  {
    title: "AI chat for planning and doubts",
    description:
      "Use the AI assistant to ask travel questions, compare options, and get quick help while shaping your itinerary.",
  },
  {
    title: "Built for calm discovery",
    description:
      "The interface keeps the focus on Kalimpong's scenery, culture, and places worth visiting.",
  },
  {
    title: "Weather shown at a glance",
    description:
      "Kalimpong weather is surfaced inside the app so travelers can plan around the local conditions before heading out.",
  },
  {
    title: "Helpful for first-time visitors",
    description:
      "Useful details and clear navigation make it easier to shape a practical itinerary.",
  },
];

const stats = [
  { value: "24/7", label: "Trip inspiration" },
  { value: "AI", label: "Travel support" },
  { value: "Weather", label: "Live trip context" },
];

export default function About() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    message: "",
    rating: "5",
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const totalRating = feedbacks.reduce(
    (sum, feedback) => sum + Number(feedback.rating || 0),
    0,
  );
  const averageRating = feedbacks.length
    ? (totalRating / feedbacks.length).toFixed(1)
    : "0.0";

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch("http://localhost:8080/feedback");
      const result = await response.json();

      if (result.success) {
        setFeedbacks(result.data);
      }
    } catch (err) {
      showToast("Something went wrong", "error", "circle-xmark");
    }
  };
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleFeedbackChange = (event) => {
    const { name, value } = event.target;
    setFeedbackForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleFeedbackSubmit = async (event) => {
    event.preventDefault();

    if (!feedbackForm.name.trim() || !feedbackForm.message.trim()) {
      showToast(
        "Please fill in your name and message.",
        "error",
        "circle-exclamation",
      );
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch("http://localhost:8080/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: feedbackForm.name.trim(),
          message: feedbackForm.message.trim(),
          rating: Number(feedbackForm.rating),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      setFeedbackForm({
        name: "",
        message: "",
        rating: "5",
      });
      showToast("Feedback submitted successfully.", "success", "check");
      await fetchFeedbacks();
    } catch (error) {
      showToast(
        "Could not submit feedback right now.",
        "error",
        "triangle-exclamation",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <section className="border-gradient w-full max-w-6xl mx-auto rounded-3xl">
          <div className="border-gradient-inner rounded-3xl p-5 sm:p-8 lg:p-10 text-white overflow-hidden relative">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.16),transparent_28%)]" />

            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs sm:text-sm uppercase tracking-[0.24em] text-white/70">
                About Kalimpong Tours
              </p>

              <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold brand-text-glow leading-tight">
                A travel companion shaped around Kalimpong's pace and beauty
              </h1>

              <p className="mt-5 text-sm sm:text-base lg:text-lg text-white/75 max-w-3xl mx-auto leading-7">
                Kalimpong Tours brings together the essentials travelers usually
                search for in separate places. From scenic spots and stays to AI
                chat for planning doubts, maps, weather updates, and practical
                trip details, the goal is to make a trip feel easier before it
                even starts.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-5 shadow-[0_0_24px_rgba(0,0,0,0.2)]"
                  >
                    <p className="text-2xl sm:text-3xl font-semibold text-white">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-white/65">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full max-w-6xl mx-auto mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="border-gradient rounded-3xl">
            <div className="border-gradient-inner rounded-3xl p-6 sm:p-8 text-white h-full">
              <h2 className="text-2xl sm:text-3xl font-semibold">
                What this platform is for
              </h2>
              <p className="mt-4 text-white/72 leading-7">
                The site is designed to present Kalimpong in a clean, modern way
                while keeping navigation practical. Visitors can explore travel
                options, compare places, ask the AI assistant for help, and
                check the weather to get a better sense of the destination
                before planning their route.
              </p>

              <div className="mt-6 space-y-4">
                {highlights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <h3 className="text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-white/68 leading-6">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-gradient rounded-3xl">
            <div className="border-gradient-inner rounded-3xl p-6 sm:p-8 text-white h-full flex flex-col gap-5">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-white/55">
                  Our mission
                </p>
                <h2 className="mt-3 text-2xl sm:text-3xl font-semibold">
                  Make exploring Kalimpong feel effortless
                </h2>
                <p className="mt-4 text-white/72 leading-7">
                  We want the experience to feel calm, useful, and visually
                  consistent with the rest of the site. Every section is meant
                  to help travelers move from inspiration to planning with less
                  friction.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm text-white/65">Best for</p>
                  <p className="mt-2 text-xl font-semibold text-white">
                    Scenic getaways, stay planning, and local discovery
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/70">
                    Whether you are visiting for nature, culture, or a quiet
                    break, the platform keeps the essentials, guidance, and
                    weather context in one place.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10  bg-black/20 p-5">
                  <p className="text-sm text-white/65">Also great for</p>
                  <p className="mt-2 text-base font-semibold text-white">
                    AI-assisted planning, quick doubts, and weather-aware trip
                    decisions
                  </p>
                </div>

                <div className="flex justify-end md:pt-28">
                  <button
                    className="bg-red-500 border-2 rounded-md px-4 py-2 white-shadow text-white"
                    onClick={() => navigate("/")}
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <section className="px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
        <div className="border-gradient w-full max-w-6xl mx-auto rounded-3xl">
          <div className="border-gradient-inner rounded-3xl p-6 sm:p-8 lg:p-10 text-white">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.24em] text-white/55">
                  Visitor feedback
                </p>
                <h2 className="mt-3 text-2xl sm:text-3xl font-semibold">
                  What travelers are saying
                </h2>
                <p className="mt-4 text-white/72 leading-7">
                  Recent responses from visitors who explored Kalimpong Tours,
                  used the AI assistant, and checked weather while planning.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 min-w-[280px]">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/55">
                    Reviews
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {feedbacks.length}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/55">
                    Average
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {averageRating}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/55">
                    Latest
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {feedbacks.length > 0 ? "Live" : "None"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              {feedbacks.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {feedbacks.slice(0, 6).map((feedback) => {
                    const initial =
                      feedback.name?.trim()?.charAt(0)?.toUpperCase() || "K";
                    const ratingValue = Number(feedback.rating || 0);
                    const stars = Array.from(
                      { length: 5 },
                      (_, index) => index < ratingValue,
                    );

                    return (
                      <div
                        key={feedback._id}
                        className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_12px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 text-lg font-semibold text-white">
                            {initial}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                              <div>
                                <h4 className="text-lg font-semibold text-white">
                                  {feedback.name}
                                </h4>
                                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/45">
                                  {feedback.createdAt
                                    ? new Date(
                                        feedback.createdAt,
                                      ).toLocaleDateString("en-IN", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                      })
                                    : "Recent feedback"}
                                </p>
                              </div>

                              <div className="flex items-center gap-1 text-yellow-400">
                                {stars.map((filled, index) => (
                                  <i
                                    key={index}
                                    className={`fa-star text-sm ${filled ? "fa-solid text-yellow-400" : "fa-regular text-white/25"}`}
                                  />
                                ))}
                              </div>
                            </div>

                            <p className="mt-4 text-sm sm:text-base leading-7 text-white/75">
                              {feedback.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-white/15 bg-black/15 px-6 py-10 text-center">
                  <p className="text-lg font-semibold text-white">
                    No feedback yet
                  </p>
                  <p className="mt-2 text-sm text-white/60">
                    Be the first to share how the app helped you plan your trip.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
        <div className="border-gradient w-full max-w-6xl mx-auto rounded-3xl">
          <div className="border-gradient-inner rounded-3xl p-6 sm:p-8 lg:p-10 text-white">
            <div className="max-w-4xl mx-auto">
              <p className="text-xs uppercase tracking-[0.24em] text-white/55">
                Feedback
              </p>
              <h2 className="mt-3 text-2xl sm:text-3xl font-semibold">
                Share your thoughts about the experience
              </h2>
              <p className="mt-4 text-white/72 leading-7 max-w-3xl">
                Tell us what worked, what felt missing, or how the AI and
                weather features helped you plan. Your feedback helps us improve
                the trip planning experience.
              </p>

              <form
                className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-5"
                onSubmit={handleFeedbackSubmit}
              >
                <div className="space-y-5">
                  <div>
                    <label
                      className="block text-sm text-white/70 mb-2"
                      htmlFor="feedback-name"
                    >
                      Name
                    </label>
                    <input
                      id="feedback-name"
                      name="name"
                      type="text"
                      value={feedbackForm.name}
                      onChange={handleFeedbackChange}
                      placeholder="Your name"
                      className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20 mb-8"
                      maxLength={80}
                    />
                  </div>

                  <div>
                    <div>
                      <label
                        className="block text-sm text-white/70 mb-2"
                        htmlFor="feedback-rating"
                      >
                        Rating
                      </label>

                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <i
                            key={star}
                            onClick={() =>
                              setFeedbackForm((prev) => ({
                                ...prev,
                                rating: star,
                              }))
                            }
                            className={`fa-star cursor-pointer text-2xl transition-all duration-200 ${
                              star <= feedbackForm.rating
                                ? "fa-solid text-yellow-400"
                                : "fa-regular text-gray-500 hover:text-yellow-300"
                            }`}
                          ></i>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label
                    className="block text-sm text-white/70 mb-2"
                    htmlFor="feedback-message"
                  >
                    Message
                  </label>
                  <textarea
                    id="feedback-message"
                    name="message"
                    value={feedbackForm.message}
                    onChange={handleFeedbackChange}
                    placeholder="Share what you liked or what we can improve..."
                    className="min-h-[190px] w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20"
                    maxLength={600}
                  />

                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
                    <p className="text-sm text-white/55">
                      Your feedback is stored with your name, message, and
                      rating.
                    </p>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting ? "Sending..." : "Send Feedback"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
