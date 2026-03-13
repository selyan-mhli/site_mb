import { useState } from 'react'
import { companyInfo } from '@/data/navigation'
import styles from './InteractiveMap.module.css'

const departments = [
    { code: '84', name: 'Vaucluse', x: 52, y: 32, projects: 4 },
    { code: '13', name: 'Bouches-du-Rhône', x: 48, y: 68, projects: 2 },
    { code: '30', name: 'Gard', x: 22, y: 42, projects: 1 },
    { code: '26', name: 'Drôme', x: 55, y: 8, projects: 1 },
    { code: '07', name: 'Ardèche', x: 20, y: 10, projects: 0 },
    { code: '04', name: 'Alpes-de-Haute-Provence', x: 78, y: 30, projects: 0 },
    { code: '83', name: 'Var', x: 72, y: 70, projects: 0 },
]

export default function InteractiveMap() {
    const [activeDept, setActiveDept] = useState<string | null>(null)
    const active = departments.find(d => d.code === activeDept)

    return (
        <section className={`section ${styles.section}`}>
            <div className="container">
                <div className={styles.header}>
                    <h2>Notre zone d'intervention</h2>
                    <p>7 départements couverts en région PACA et alentours.</p>
                </div>

                <div className={styles.layout}>
                    <div className={styles.mapWrap}>
                        <div className={styles.map}>
                            {departments.map(dept => (
                                <button
                                    key={dept.code}
                                    className={`${styles.pin} ${activeDept === dept.code ? styles.pinActive : ''}`}
                                    style={{ left: `${dept.x}%`, top: `${dept.y}%` }}
                                    onClick={() => setActiveDept(activeDept === dept.code ? null : dept.code)}
                                    aria-label={`${dept.name} (${dept.code})`}
                                >
                                    <span className={styles.pinDot} />
                                    <span className={styles.pinLabel}>{dept.code}</span>
                                </button>
                            ))}

                            {/* Simplified PACA outline */}
                            <svg className={styles.outline} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M60 30 L160 10 L280 20 L350 60 L370 150 L340 230 L280 270 L180 280 L100 260 L40 200 L20 120 L30 70 Z"
                                    stroke="var(--primary-300)"
                                    strokeWidth="2"
                                    fill="var(--primary-50)"
                                    opacity="0.5"
                                />
                            </svg>
                        </div>
                    </div>

                    <div className={styles.info}>
                        {active ? (
                            <div className={styles.deptCard}>
                                <div className={styles.deptBadge}>{active.code}</div>
                                <h3>{active.name}</h3>
                                <p>{active.projects > 0 ? `${active.projects} acquisition${active.projects > 1 ? 's' : ''} réalisée${active.projects > 1 ? 's' : ''}` : 'Zone couverte — acquisitions en cours'}</p>
                            </div>
                        ) : (
                            <p className={styles.hint}>Cliquez sur un département pour voir les détails.</p>
                        )}

                        <ul className={styles.deptList}>
                            {companyInfo.zone.map((z, i) => (
                                <li
                                    key={i}
                                    className={activeDept === departments[i]?.code ? styles.deptListActive : ''}
                                    onClick={() => setActiveDept(departments[i]?.code || null)}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                    {z}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
