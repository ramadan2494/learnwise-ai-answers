
import React, { useState } from 'react';
import { Brain, Target, Star, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PracticeCardProps {
  question: {
    question: string;
    subject: string;
    difficulty: string;
    topic: string;
    choices: string[];
  };
  questionNumber: number;
}

const PracticeCard = ({ question, questionNumber }: PracticeCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const checkAnswer = () => {
    if (selectedAnswer === null) return;
    
    // For demo purposes, let's assume the first choice is usually correct
    // In a real implementation, you'd get the correct answer from the API
    const correctAnswer = 0;
    const correct = selectedAnswer === correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
  };

  const resetQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="font-bold text-purple-600 text-sm">{questionNumber}</span>
            </div>
            <h4 className="font-semibold text-gray-800">Practice Question</h4>
          </div>
          
          {showResult && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-3 h-3" />
                  Correct!
                </>
              ) : (
                <>
                  <XCircle className="w-3 h-3" />
                  Try Again
                </>
              )}
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            <Brain className="w-3 h-3 mr-1" />
            {question.subject}
          </Badge>
          
          <Badge variant="outline" className={`text-xs border ${getDifficultyColor(question.difficulty)}`}>
            <Target className="w-3 h-3 mr-1" />
            {question.difficulty}
          </Badge>
          
          <Badge variant="outline" className="text-xs">
            <Star className="w-3 h-3 mr-1" />
            {question.topic}
          </Badge>
        </div>
      </div>

      {/* Question Content */}
      <div className="p-6">
        <div className="mb-6">
          <p className="text-gray-800 text-lg leading-relaxed font-medium">
            {question.question}
          </p>
        </div>

        {/* Answer Choices */}
        <div className="space-y-3 mb-6">
          {question.choices.map((choice, index) => {
            let choiceClass = "border-2 border-gray-200 hover:border-purple-300 bg-white hover:bg-purple-50";
            
            if (showResult) {
              if (index === 0) { // Assuming first choice is correct for demo
                choiceClass = "border-2 border-green-500 bg-green-50";
              } else if (index === selectedAnswer && !isCorrect) {
                choiceClass = "border-2 border-red-500 bg-red-50";
              } else {
                choiceClass = "border-2 border-gray-200 bg-gray-50";
              }
            } else if (selectedAnswer === index) {
              choiceClass = "border-2 border-purple-500 bg-purple-50";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${choiceClass}`}
                disabled={showResult}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                    selectedAnswer === index 
                      ? showResult 
                        ? index === 0 
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-red-500 bg-red-500 text-white'
                        : 'border-purple-500 bg-purple-500 text-white'
                      : 'border-gray-400 text-gray-600'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-gray-700">{choice}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {!showResult ? (
            <Button
              onClick={checkAnswer}
              disabled={selectedAnswer === null}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Check Answer
            </Button>
          ) : (
            <Button
              onClick={resetQuestion}
              variant="outline"
              className="flex-1 border-purple-300 text-purple-700 hover:bg-purple-50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PracticeCard;
