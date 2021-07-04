# Description of Take Home Test 


## Introduction
Thank you for your interest in the Sr. Software Engineer - Full Stack role at NeuroFlow.
As the next step in the process, we'd like to have you complete a take-home assessment.
There's no time limit, but we don't expect you to spend more than 2 or 3 hours on this.
If you don't complete all the requirements in that time, don't worry; we'll work with
what's been completed. 

## Specification
For this assessment, imagine that you've just met with a product
manager and designer to discuss a new feature. In this new feature, you'll be connecting
to an API that returns a user's albums along with some metadata about them, and creating
a table display. The specific requirements that you know are:

- The page or the table should have a loading animation or indication while the API call is processing

- The columns in the table should be: Band, Album, Genres (formatted as a comma-separated list),
Average User Rating (rounded to 1 decimal place), Date Released, Last Played (formatted as "MM/DD/YYYY HH:MM am")

- Every column should be sortable by the user

- The default sort should be on Last Played in descending order (most recent played at top)

- If the user refreshes the page, whatever their most recent sort column and direction was
should be applied on reload

- The current sort should be visually represented

- The background color of the sorted column's header cell should be #ADD8E6

- A column's header cell should show a downwards caret if sorted descending and an upwards
caret if sorted ascending

We're just as interested in seeing your planning and architecture process as the code you write.
With that in mind, put yourself in the position of building this for a company where you've seen
a pattern of tables evolving into paginated views. You suspect that this table will become paginated
within the year, meaning that the sort functionality would also shift to the backend and be controlled
by parameters in the API URL. How do you account for this potential future state in your build? What
patterns do you use to ensure that the shift to backend pagination and sorting doesn't require
a large re-architecture? You don't need to add any of this to a file in the repo, but make notes as you
work, because we'll want to discuss this aspect of the project in later interview stages.Additionally,
some of the instructions given are purposely vague. Think about what clarifying questions you would ask
if you were grooming this story before developing it. Feel free to make assumptions about what the
answers are, but note down what those questions were, what assumptions you made, and why.

## Other requirements:
- The only technology you're required to use is React. Besides that, feel free to incorporate as many or
as few other packages as you see proper.

- You're not expected to set up an actual API call. You should find 2 files included on
this email: 1 is the JSON to use as the API return, and the other is a function that you
can use to simulate the API call. by feeding in the JSON as the returnValue argument.

## Submission Procedure
Please submit the project by linking to a Github repo (either available to the public or shared
with tony@neuroflow.com and matt@neuroflow.com) to the link found below.

Include a readme.md in your project with directions on how to start and view the app locally.

## Conclusion
Thank you very much for your interest in NeuroFlow. Let me know if you have any questions about
the project. We look forward to seeing your work!

Please submit here:
https://app3.greenhouse.io/tests/03e91ab2581c462bd6697e62b7f20fe4?utm_medium=email&utm_source=TakeHomeTest

## Attachments
Attachments:
- albums_(1).json
- mock_api_(1).js
