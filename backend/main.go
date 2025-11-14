package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

type Section struct {
	ID      string                 `json:"id"`
	Title   string                 `json:"title"`
	Content map[string]interface{} `json:"content"`
}

type DailyLog struct {
	ID          string   `json:"id"`
	Date        string   `json:"date"`
	Tasks       string   `json:"tasks"`
	Reflections string   `json:"reflections"`
	Learnings   string   `json:"learnings"`
	Challenges  string   `json:"challenges"`
	Images      []string `json:"images"`
}

type WeeklyLog struct {
	ID           string `json:"id"`
	Week         string `json:"week"`
	Summary      string `json:"summary"`
	Achievements string `json:"achievements"`
	Challenges   string `json:"challenges"`
	NextWeek     string `json:"nextWeek"`
}

const dataDir = "./data"

func main() {
	// Create data directory if it doesn't exist
	os.MkdirAll(dataDir, 0755)

	router := mux.NewRouter()

	// API Routes
	api := router.PathPrefix("/api").Subrouter()

	// Section routes
	api.HandleFunc("/sections/{id}", getSectionHandler).Methods("GET")
	api.HandleFunc("/sections/{id}", saveSectionHandler).Methods("POST")

	// Daily logs routes
	api.HandleFunc("/logs/daily", getDailyLogsHandler).Methods("GET")
	api.HandleFunc("/logs/daily", saveDailyLogHandler).Methods("POST")
	api.HandleFunc("/logs/daily/{id}", deleteDailyLogHandler).Methods("DELETE")

	// Weekly logs routes
	api.HandleFunc("/logs/weekly", getWeeklyLogsHandler).Methods("GET")
	api.HandleFunc("/logs/weekly", saveWeeklyLogHandler).Methods("POST")
	api.HandleFunc("/logs/weekly/{id}", deleteWeeklyLogHandler).Methods("DELETE")

	// Health check
	api.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
	}).Methods("GET")

	// CORS
	corsHandler := handlers.CORS(
		handlers.AllowedOrigins([]string{"http://localhost:3000"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
	)

	log.Println("🚀 LIA Rapport Backend Server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", corsHandler(router)))
}

// Section Handlers
func getSectionHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	filePath := filepath.Join(dataDir, id+".json")
	data, err := os.ReadFile(filePath)

	w.Header().Set("Content-Type", "application/json")

	if err != nil {
		if os.IsNotExist(err) {
			json.NewEncoder(w).Encode(map[string]interface{}{"content": map[string]interface{}{}})
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write(data)
}

func saveSectionHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	var section Section
	if err := json.NewDecoder(r.Body).Decode(&section); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	section.ID = id
	filePath := filepath.Join(dataDir, id+".json")

	data, err := json.MarshalIndent(section, "", "  ")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if err := os.WriteFile(filePath, data, 0644); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "saved"})
}

// Daily Logs Handlers
func getDailyLogsHandler(w http.ResponseWriter, r *http.Request) {
	filePath := filepath.Join(dataDir, "daily_logs.json")
	data, err := os.ReadFile(filePath)

	w.Header().Set("Content-Type", "application/json")

	if err != nil {
		if os.IsNotExist(err) {
			json.NewEncoder(w).Encode([]DailyLog{})
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write(data)
}

func saveDailyLogHandler(w http.ResponseWriter, r *http.Request) {
	var logs []DailyLog
	filePath := filepath.Join(dataDir, "daily_logs.json")

	// Read existing logs
	data, err := os.ReadFile(filePath)
	if err == nil {
		json.Unmarshal(data, &logs)
	}

	var newLog DailyLog
	if err := json.NewDecoder(r.Body).Decode(&newLog); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Update or append
	found := false
	for i, log := range logs {
		if log.ID == newLog.ID {
			logs[i] = newLog
			found = true
			break
		}
	}

	if !found {
		logs = append(logs, newLog)
	}

	// Save
	data, err = json.MarshalIndent(logs, "", "  ")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if err := os.WriteFile(filePath, data, 0644); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "saved"})
}

func deleteDailyLogHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	var logs []DailyLog
	filePath := filepath.Join(dataDir, "daily_logs.json")

	data, err := os.ReadFile(filePath)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.Unmarshal(data, &logs)

	// Filter out the log to delete
	var filteredLogs []DailyLog
	for _, log := range logs {
		if log.ID != id {
			filteredLogs = append(filteredLogs, log)
		}
	}

	data, _ = json.MarshalIndent(filteredLogs, "", "  ")
	os.WriteFile(filePath, data, 0644)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "deleted"})
}

// Weekly Logs Handlers
func getWeeklyLogsHandler(w http.ResponseWriter, r *http.Request) {
	filePath := filepath.Join(dataDir, "weekly_logs.json")
	data, err := os.ReadFile(filePath)

	w.Header().Set("Content-Type", "application/json")

	if err != nil {
		if os.IsNotExist(err) {
			json.NewEncoder(w).Encode([]WeeklyLog{})
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write(data)
}

func saveWeeklyLogHandler(w http.ResponseWriter, r *http.Request) {
	var logs []WeeklyLog
	filePath := filepath.Join(dataDir, "weekly_logs.json")

	data, err := os.ReadFile(filePath)
	if err == nil {
		json.Unmarshal(data, &logs)
	}

	var newLog WeeklyLog
	if err := json.NewDecoder(r.Body).Decode(&newLog); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	found := false
	for i, log := range logs {
		if log.ID == newLog.ID {
			logs[i] = newLog
			found = true
			break
		}
	}

	if !found {
		logs = append(logs, newLog)
	}

	data, err = json.MarshalIndent(logs, "", "  ")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if err := os.WriteFile(filePath, data, 0644); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "saved"})
}

func deleteWeeklyLogHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	var logs []WeeklyLog
	filePath := filepath.Join(dataDir, "weekly_logs.json")

	data, err := os.ReadFile(filePath)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.Unmarshal(data, &logs)

	var filteredLogs []WeeklyLog
	for _, log := range logs {
		if log.ID != id {
			filteredLogs = append(filteredLogs, log)
		}
	}

	data, _ = json.MarshalIndent(filteredLogs, "", "  ")
	os.WriteFile(filePath, data, 0644)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "deleted"})
}
