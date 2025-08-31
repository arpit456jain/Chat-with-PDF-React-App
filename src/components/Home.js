import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Header from "./Header";
import Footer from "./Footer";
import Spinner from "react-bootstrap/Spinner";

function Home() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [pdf, setPdf] = useState(null);
  const [summary, setSummary] = useState("");
  const [queryResult, setQueryResult] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingAsk, setLoadingAsk] = useState(false);

  function handleFileChange(e) {
    setPdf(e.target.files[0]);
  }

  async function handleQuery(e) {
    e.preventDefault();

    if (!query) {
      toast.error("Please enter a query!");
      return;
    }

    try {
      setLoadingAsk(true)
      const formData = new FormData();
      formData.append("pdf", pdf);
      formData.append("question", query);

      const response = await fetch("http://127.0.0.1:8000/chatWithPDF/ask/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      setQueryResult(data.answer);
      toast.success("Query processed!");
    } catch (error) {
      toast.error(error.message);
    }
    finally {
      setLoadingAsk(false);
    }
  }
  async function handleSummarize(e) {
    e.preventDefault();
    setLoading()

    if (!pdf) {
      toast.error("Please upload a PDF first!");
      return;
    }

    try {
      setLoading(true)
      const formData = new FormData();
      formData.append("pdf", pdf);

      // Call your Django API
      const response = await fetch(
        " http://127.0.0.1:8000/chatWithPDF/summarize/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to summarize PDF");
      }

      const data = await response.json();
      setSummary(data.summary);
      toast.success("Summary generated!");
    } catch (error) {
      toast.error(error.message);
    }finally {
    setLoading(false);
    }
  }
  return (
    <>
      <Header loginstatus={user} />
      <Container className="col-lg-7 col-md-10">
        <Form onSubmit={handleSummarize}>
          {user != null ? (
            <>
              <h1> Welcome {user.name} </h1>
              <h2>Upload the PDF to Chat with !! </h2>
            </>
          ) : (
            <h1>Please Login First!!</h1>
          )}

          <Form.Group className="">
            <Form.Control
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              required
              placeholder="Upload PDF File"
            />
          </Form.Group>

          {loading ? 
          <Button variant="info" type="submit" disabled={!pdf} className="mt-2">
            <Spinner animation="border" variant="dark" />
          </Button> : 
          <Button variant="info" type="submit" disabled={!pdf} className="mt-2">
            Summarize
          </Button>
        }
          
        </Form>
      </Container>
      <Container className="col-lg-7 col-md-10">
        {summary && (
          <>
            <div className="mt-4 p-3 border rounded bg-light">
              <h5>Summary:</h5>
              <p>{summary}</p>
            </div>

            <div className="my-2">
              <h3 className="mt-3 mb-1 text-white">
                Ask Questions About the PDF
              </h3>
              <Form onSubmit={handleQuery}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter the query"
                    value={query}
                    required
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </Form.Group>

                {
                  loadingAsk ?
                   <Button variant="info" type="submit" className="mt-2">
                   <Spinner animation="border" variant="dark" />
                </Button>
                :
                   <Button variant="info" type="submit" className="mt-2">
                  Ask
                </Button>
                }
                
              </Form>
            </div>
            {queryResult && (
              <div className="mt-4 p-3 border rounded bg-light">
                <h5>Result:</h5>
                {queryResult.split("\n").map((line, index) => {
                  // If line starts with **, render as section heading
                  if (line.startsWith("**")) {
                    return (
                      <h6 key={index} className="mt-3">
                        {line.replace(/\*\*/g, "")}
                      </h6>
                    );
                  }

                  // If line starts with number (like "1."), render as list item
                  if (/^\d+\./.test(line.trim())) {
                    return (
                      <li key={index} className="ms-3">
                        {line.replace(/^\d+\.\s*/, "")}
                      </li>
                    );
                  }

                  // Default: render as plain text
                  return <p key={index}>{line}</p>;
                })}
              </div>
            )}
          </>
        )}
      </Container>
      <Footer summary={summary}></Footer>
    </>
  );
}

export default Home;
