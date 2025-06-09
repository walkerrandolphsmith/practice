% 1. If the lamp does not work Then check to see that the power is on 
% 2. If the power is not on Then check for blown fuse 
% 3. If the power is not on and the fuse is good Then check for a power failure 
% 4. If the power is not on and there is no fuse Then check for a tripped circuit breaker 
% 5. If the power is not on and the circuit breaker is on Then check for a power failure 
% 6. If there is a power failure Then wait for power to come back on 
% 7. If the power is on Then check the bulb 
% 8. If the bulb is bad then replace the bulb 
% 9. If the bulb is good then check the switch 
% 10. If switch is bad Then replace the switch 
% 11. If bulb is good and the switch is good Then check the plug 
% 12. If the plug is bad Then fix or replace the plug 
% 13. If the bulb is good and the switch is good and the plug is good Then check the cord 
% 14. If the cord is bad Then fix or replace the cord 
% 15. If the bulb is good and the switch is good and the plug is good and the cord is good Then check the wall outlet 
% 16. If the wall outlet is bad Then fix or replace the outlet 

% The starting assumption is that the lamp does not work.
% The system attempts to discover the reason and suggest a course of action.

% The system asks some questions as it goes.
% To begin with, the system wants to ascertain the power is available.
% If the power is absent, the system asks to check fuses or circuit breakers or determine if there is a power failure.

% The search tree from the lamp repair expert system is as follows:
%           1
%         /   \
%        /     \
%       2       7
%      / \     / \
%      / \     / \
%     3   4   8   9
%    /     \     / \
%   6 ----- 5   10  11
%                  /  \
%                 12  13
%                     / \
%                    14  15
%                         \
%                         16

:-dynamic remember/2.
:-dynamic path/1.

question(power_on, 'Is the power on').
question(bulb_bad, 'Is the bulb bad').
question(switch_bad, 'Is the switch bad').
question(plug_bad, 'Is the plug bad').
question(cord_bad, 'Is the cord bad').
question(outlet_bad, 'Is the wall outlet bad').
question(has_fuse, 'Is there a fuse').
question(fuse_bad, 'Is the fuse bad').
question(circuit_breaker_tripped, 'Is the circuit breaker tripped').
question(power_failure, 'Is there a power failure').

plain_english(power_on, yes, 'the power is on').
plain_english(power_on, no, 'the power is off').
plain_english(bulb_bad, yes, 'the bulb is bad').
plain_english(bulb_bad, no, 'the bulb is not bad').
plain_english(switch_bad, yes, 'the switch is bad').
plain_english(switch_bad, no, 'the switch is not bad').
plain_english(plug_bad, yes, 'the plug is bad').
plain_english(plug_bad, no, 'the plug is not bad').
plain_english(cord_bad, yes, 'the cord is bad').
plain_english(cord_bad, no, 'the cord is not bad').
plain_english(outlet_bad, yes, 'the wall outlet is bad').
plain_english(outlet_bad, no, 'the wall outlet is not bad').
plain_english(has_fuse, yes, 'there is a fuse').
plain_english(has_fuse, no, 'there is no fuse').
plain_english(fuse_bad, yes, 'the fuse is bad').
plain_english(fuse_bad, no, 'the fuse is not bad').
plain_english(circuit_breaker_tripped, yes, 'the circuit breaker is tripped').
plain_english(circuit_breaker_tripped, no, 'the circuit breaker is not tripped').
plain_english(power_failure, yes, 'there is a power failure').
plain_english(power_failure, no, 'there is no power failure').

collect_explanations(Explanations) :-
    findall(
        Explanation,
        (
            path(QuestionId-Answer),
            plain_english(QuestionId, Answer, Explanation)
        ),
        Explanations
    ).

ask_and_remember(QuestionId) :-
    question(QuestionId, Question),
    write(Question), write('? '),
    read_string(user_input, "\n", "\r", _, Response),
    (
        Response == "yes" ->
            asserta(remember(QuestionId, "yes")),
            assertz(path(QuestionId-yes));
        Response == "no" ->
            asserta(remember(QuestionId, "no")),
            assertz(path(QuestionId-no)),
            fail;
        write('Please answer yes or no'), nl, ask_and_remember(QuestionId)
    ).

is_true(QuestionId):- (
        remember(QuestionId,"yes") -> remember(QuestionId,"yes");
        remember(QuestionId,"no") -> fail;
        ask_and_remember(QuestionId)
    ).

diagnose('fix or replace the wall outlet') :-
    is_true(power_on),
    not(is_true(bulb_bad)),
    not(is_true(switch_bad)),
    not(is_true(plug_bad)),
    not(is_true(cord_bad)),
    is_true(outlet_bad).

diagnose('fix or replace the cord') :-
    is_true(power_on),
    not(is_true(bulb_bad)),
    not(is_true(switch_bad)),
    not(is_true(plug_bad)),
    is_true(cord_bad), !.

diagnose('fix or replace the plug') :-
    is_true(power_on),
    not(is_true(bulb_bad)),
    not(is_true(switch_bad)),
    is_true(plug_bad), !.

diagnose('replace the switch') :-
    is_true(power_on),
    not(is_true(bulb_bad)),
    is_true(switch_bad), !.

diagnose('replace the bulb') :-
    is_true(power_on),
    is_true(bulb_bad), !.

diagnose('wait for power to come back on') :-
    not(is_true(power_on)),
    not(is_true(has_fuse)),
    not(is_true(circuit_breaker_tripped)),
    is_true(power_failure), !.

diagnose('reset or replace the breaker') :-
    not(is_true(power_on)),
    not(is_true(has_fuse)),
    is_true(circuit_breaker_tripped), !.

diagnose('wait for the power to come back on') :-
    not(is_true(power_on)),
    is_true(has_fuse),
    not(is_true(fuse_bad)),
    is_true(power_failure), !.

diagnose('replace the fuse') :-
    not(is_true(power_on)),
    is_true(has_fuse),
    is_true(fuse_bad), !.

diagnose('The lamp appears to have no issues.') :-
    !.

concatenate_explanations([], "").
concatenate_explanations([Explanation], Explanation).
concatenate_explanations([First, Second], Concatenated) :-
    format(atom(Concatenated), '~w and ~w', [First, Second]).
concatenate_explanations([First|Rest], Concatenated) :-
    concatenate_explanations(Rest, RestConcatenated),
    format(atom(Concatenated), '~w, ~w', [First, RestConcatenated]).

explain(Diagnosis) :-
    diagnose(Diagnosis),
    write('Explanation:'),
    nl,
    print_explanation,
    !.

print_explanation :-
    collect_explanations(Explanations),
    concatenate_explanations(Explanations, ConcatenatedExplanation),
    write(ConcatenatedExplanation), nl.

reset :-
    retractall(remember(_, _)),
    retractall(path(_)),
    !.

start_diagnostics :-
    retractall(remember(_, _)),
    retractall(path(_)),
    diagnose(Scenario),
    nl,
    write(Scenario),
    nl,
    write('Explanation:'),
    nl,
    print_explanation,
    !.

% Run the expert system with `swipl -s db.pl`